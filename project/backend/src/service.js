import fs from 'fs';
import jwt from 'jsonwebtoken';
import AsyncLock from 'async-lock';
import { InputError, AccessError, } from './error';

const lock = new AsyncLock();

const JWT_SECRET = 'tomatofrog';
const DATABASE_FILE = './backend/data/database.json';

/***************************************************************
                    Data and State Management
***************************************************************/

let users = {};
let events = {};

const STATUS = {
  GOING: 'GOING',
  MAYBE: 'MAYBE',
  NOTGOING: 'NOTGOING',
};

const sessionTimeouts = {};

const update = (users, events) =>
  new Promise((resolve, reject) => {
    lock.acquire('saveData', () => {
      try {
        fs.writeFileSync(DATABASE_FILE, JSON.stringify({
          users,
          events,
        }, null, 2));
        resolve();
      } catch {
        reject(new Error('Writing to database failed'));
      }
    });
  });

export const save = () => update(users, events);

export const reset = () => {
  update({}, {});
  users = {};
  events = {};
};

// Startup
try {
  const data = JSON.parse(fs.readFileSync(DATABASE_FILE));
  users = data.users;
  events = data.events;
} catch {
  console.log('No database found, creating a new one');
  save();
}

/***************************************************************
                       Helper Functions
***************************************************************/

const newUserId = _ => generateId(Object.keys(users));
const newEventId = _ => generateId(Object.keys(events));

export const userLock = callback => new Promise((resolve, reject) => {
  lock.acquire('userAuthLock', callback(resolve, reject));
});

export const eventLock = callback => new Promise((resolve, reject) => {
  lock.acquire('eventMutateLock', callback(resolve, reject));
});

const getUserWithEmail = email => {
  for (const [userId, user] of Object.entries(users)) {
    if (user.email === email) {
      return [userId, user];
    }
  }

  return null;
};

const randNum = max => Math.round(Math.random() * (max - Math.floor(max / 10)) + Math.floor(max / 10));

const generateToken = userId => jwt.sign({ userId, }, JWT_SECRET, { algorithm: 'HS256', });

const generateEventCode = () => {
  let R = Math.random().toString(36).substring(2, 7);
  let unique = false;

  while (!unique) {
    unique = true;
    Object.keys(events).forEach(eventId => {
      if (unique && events[eventId].code === R) {
        unique = false;
        R = Math.random().toString(36).substring(2, 7);
      }
    });
  }

  return R;
}

const generateId = (currentList, max = 999999999) => {
  let R = randNum(max);

  while (currentList.includes(R)) {
    R = randNum(max);
  }

  return R.toString();
};

/***************************************************************
                       Auth Functions
***************************************************************/

export const getUserIdFromAuthorization = authorization => {
  try {
    const token = authorization.replace('Bearer ', '');
    const { userId, } = jwt.verify(token, JWT_SECRET);
    if (!(userId in users)) {
      throw new AccessError('Invalid token');
    }
    return userId;
  } catch {
    throw new AccessError('Invalid token');
  }
};

export const login = (email, password) => userLock((resolve, reject) => {
  let [userId, user] = getUserWithEmail(email);
  if (user === null || user.password !== password) {
    reject(new InputError('Invalid username or password'));
    return;
  }

  users[userId].sessionActive = true;

  save();
  resolve(generateToken(userId));
});

// Assumes userId is valid
export const logout = userId => userLock((resolve, reject) => {
  users[userId].sessionActive = false;
  save();
  resolve();
});

export const register = (email, name, password) => userLock((resolve, reject) => {
  if (getUserWithEmail(email) !== null) {
    reject(new InputError('Email address already registered'));
    return;
  }

  const userId = newUserId();
  users[userId] = {
    email: email,
    name: name,
    password: password,
    invites: [],
    friends: [],
    sessionActive: true,
  };

  save();
  resolve(generateToken(userId));
});

/***************************************************************
                       Event Functions
***************************************************************/

export const assertValidEventId = eventId => eventLock((resolve, reject) => {
  if (!(eventId in events)) {
    reject(new InputError('Invalid event ID'));
    return;
  }

  resolve();
});

// Assumes userId and eventId are valid
export const assertEventHost = (userId, eventId) => eventLock((resolve, reject) => {
  if (events[eventId].host !== userId) {
    reject(new InputError('Not a host of this event'));
    return;
  }

  resolve();
});

// Assumes userId and eventId are valid. Note that the host of an event
// is also a guest of that event.
export const assertEventGuest = (userId, eventId) => eventLock((resolve, reject) => {
  if (!(userId in events[eventId].guests)) {
    reject(new InputError('Not a guest in this event'));
    return;
  }

  resolve();
});

// Assumes userId is valid
export const createEvent = userId => eventLock((resolve, reject) => {
  const eventId = newEventId();
  const eventCode = generateEventCode();

  const guests = {};
  guests[userId] = STATUS.GOING;

  events[eventId] = {
    name: 'Untitled Event',
    host: userId,
    code: eventCode,
    permissions: {
      guestsCanInvite: true,
      guestsCanAddLocations: true,
      guestsCanAddTimes: true,
    },
    guests: guests,
    locations: {},
    times: [],
  };

  save();
  resolve(eventId);
});

// Assumes eventId is valid
export const getEvent = eventId => eventLock((resolve, reject) => {
  resolve(events[eventId]);
});

// Assumes userId and eventId are valid and the user performing this action is a host
export const deleteEvent = eventId => eventLock((resolve, reject) => {
  delete events[eventId];
  save();
  resolve();
});
  
// Assumes userId is valid
export const getJoinedEvents = userId => eventLock((resolve, reject) => {
  resolve(Object.keys(events).filter(eventId => userId in events[eventId].guests));
});

// Assumes userId and eventId are valid
export const joinEventWithId = (userId, eventId) => eventLock((resolve, reject) => {
  if (userId in events[eventId].guests) {
    reject(new InputError('Already joined event'));
    return;
  }

  events[eventId].guests[userId] = STATUS.MAYBE;

  save();
  resolve();
});

// Assumes userId is valid
export const joinEventWithCode = (userId, eventCode) => eventLock((resolve, reject) => {
  let eventId = Object.keys(events).find(eventId => events[eventId].code === eventCode);

  if (eventId === undefined) {
    reject(new InputError('Invalid event code'));
    return;
  }

  if (userId in events[eventId].guests) {
    reject(new InputError('Already joined event'));
    return;
  }

  events[eventId].guests[userId] = STATUS.MAYBE;

  save();
  resolve();
});

// Assumes eventId is valid and the user performing this action is a host
export const editEventSettings = (eventId, newName, newPermissions) => eventLock((resolve, reject) => {
  if (newName && typeof newName !== 'string') {
    reject(new InputError('Invalid event name'));
    return;
  }

  if (
    newPermissions && (
      typeof newPermissions !== 'object' ||
      typeof newPermissions.guestsCanInvite !== 'boolean' || 
      typeof newPermissions.guestsCanAddLocations !== 'boolean' || 
      typeof newPermissions.guestsCanAddTimes !== 'boolean'
    )
  ) {
    reject(new InputError('Invalid event permissions'));
    return;
  }

  if (newName) {
    events[eventId].name = newName;
  }

  if (newPermissions) {
    events[eventId].permissions = newPermissions;
  }

  save();
  resolve();
});

// Assumes userId and eventId are valid and userId is a guest in eventId
export const leaveEvent = (userId, eventId) => eventLock((resolve, reject) => {
  if (events[eventId].host === userId) {
    reject(new AccessError('You cannot leave an event you are hosting - delete it instead'));
    return;
  }

  delete events[eventId].guests[userId];
  save();
  resolve();
});

// Assumes userId and eventId are valid and userId is a guest in eventId
export const setEventStatus = (userId, eventId, status) => eventLock((resolve, reject) => {
  if (!(status in STATUS)) {
    reject(new InputError('Invalid status'));
    return;
  }

  events[eventId].guests[userId] = STATUS[status];

  save();
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const sendInvite = (userId, eventId, friendId) => eventLock((resolve, reject) => {
  if (events[eventId].host !== userId && !events[eventId].permissions.guestsCanInvite) {
    reject(new AccessError('The host of this event has not permitted this action'));
    return;
  }

  if (!(friendId in users)) {
    reject(new InputError('Invalid user ID'));
    return;
  }

  if (users[friendId].invites.find(eId => eId === eventId) !== undefined) {
    reject(new InputError('User has already been invited to this event'));
    return;
  }

  users[friendId].invites.push(eventId);

  save();
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const addLocation = (userId, eventId, location) => eventLock((resolve, reject) => {
  if (events[eventId].host !== userId && !events[eventId].permissions.guestsCanAddLocations) {
    reject(new AccessError('The host of this event has not permitted this action'));
    return;
  }

  if (typeof location !== 'string') {
    reject(new InputError('Invalid location'));
    return;
  }

  if (location in events[eventId].locations) {
    reject(new InputError('Location has already been added to this event'));
    return;
  }

  events[eventId].locations[location] = [];

  save();
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const addTime = (userId, eventId, start, end) => eventLock((resolve, reject) => {
  if (events[eventId].host !== userId && !events[eventId].permissions.guestsCanAddTimes) {
    reject(new AccessError('The host of this event has not permitted this action'));
    return;
  }

  if (events[eventId].times.find(time => time.start === start && time.end === end) !== undefined) {
    reject(new InputError('Time has already been added to this event'));
    return;
  }

  events[eventId].times.push({
    start: start,
    end: end,
    voters: []
  });

  save();
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const voteLocation = (userId, eventId, location) => eventLock((resolve, reject) => {
  if (!(location in events[eventId].locations)) {
    reject(new InputError('Location has not been added'));
    return;
  }

  if (events[eventId].locations[location].find(uId => uId === userId) !== undefined) {
    reject(new InputError('Already voted for this location'));
    return;
  }

  events[eventId].locations[location].push(userId);

  save();
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const voteTime = (userId, eventId, start, end) => eventLock((resolve, reject) => {
  const timeIdx = events[eventId].times.findIndex(time => time.start === start && time.end === end);

  if (timeIdx === -1) {
    reject(new InputError('Time has not been added'));
    return;
  }

  if (events[eventId].times[timeIdx].voters.find(uId => uId === userId) !== undefined) {
    reject(new InputError('Already voted for this time'));
    return;
  }

  events[eventId].times[timeIdx].voters.push(userId);

  save();
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const unvoteLocation = (userId, eventId, location) => eventLock((resolve, reject) => {
  if (!(location in events[eventId].locations)) {
    reject(new InputError('Location has not been added'));
    return;
  }

  if (events[eventId].locations[location].find(uId => uId === userId) === undefined) {
    reject(new InputError('Have not voted for this location'));
    return;
  }

  const userIdIdx = events[eventId].locations[location].indexOf(userId);
  events[eventId].locations[location].splice(userIdIdx, 1);

  save();
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const unvoteTime = (userId, eventId, start, end) => eventLock((resolve, reject) => {
  const timeIdx = events[eventId].times.findIndex(time => time.start === start && time.end === end);

  if (timeIdx === -1) {
    reject(new InputError('Time has not been added'));
    return;
  }

  if (events[eventId].times[timeIdx].voters.find(uId => uId === userId) === undefined) {
    reject(new InputError('Have not voted for this time'));
    return;
  }

  const userIdIdx = events[eventId].times[timeIdx].voters.indexOf(userId);
  events[eventId].times[timeIdx].voters.splice(userIdIdx, 1);

  save();
  resolve();
});

/***************************************************************
                          User Functions
***************************************************************/

// Assumes userId is valid
export const getFriends = userId => userLock((resolve, reject) => {
  resolve(users[userId].friends);
});

// Assumes userId is valid
export const getInvites = userId => userLock((resolve, reject) => {
  resolve(users[userId].invites);
});

// Assumes userId is valid
export const setFriends = (userId, newFriends) => userLock((resolve, reject) => {
  if (!Array.isArray(newFriends)) {
    reject(new InputError('Invalid friends array'));
    return;
  }

  if (newFriends.filter(friendId => !(friendId in users)).length > 0) {
    reject(new InputError('Invalid friends array'));
    return;
  }

  users[userId].friends = newFriends;

  save();
  resolve();
});

// Assumes userId is valid
export const setInvites = (userId, newInvites) => userLock((resolve, reject) => {
  if (!Array.isArray(newInvites)) {
    reject(new InputError('Invalid invites array'));
    return;
  }

  if (newInvites.filter(eventId => !(eventId in events)).length > 0) {
    reject(new InputError('Invalid invites array'));
    return;
  }

  users[userId].invites = newInvites;

  save();
  resolve();
});
