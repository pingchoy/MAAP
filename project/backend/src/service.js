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
  GOING: 0,
  MAYBE: 1,
  NOTGOING: 2,
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
  let R = Math.random().toString(36).substring(5);
  let unique = false;

  while (!unique) {
    unique = true;
    for (eventId in Object.keys(events)) {
      if (events[eventId].code === R) {
        unique = false;
        R = Math.random().toString(36).substring(5);
        break;
      }
    };
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
  if (user !== null) {
    if (user.password === password) {
      user.sessionActive = true;
      resolve(generateToken(userId));
    }
  }

  reject(new InputError('Invalid username or password'));
});

// Assumes userId is valid
export const logout = userId => userLock((resolve, reject) => {
  uesrs[userId].sessionActive = false;
  resolve();
});

export const register = (email, name, password) => userLock((resolve, reject) => {
  if (getUserWithEmail(email) !== null) {
    reject(new InputError('Email address already registered'));
  }

  const userId = newUserId();
  users[userId] = {
    email,
    name,
    password,
    invites: [],
    friends: [],
    sessionActive: true,
  };

  resolve(generateToken(userId));
});

/***************************************************************
                       Event Functions
***************************************************************/

export const assertValidEventId = eventId => eventLock((resolve, reject) => {
  if (!(eventId in events)) {
    reject(new InputError('Invalid event ID'));
  }

  resolve();
});

// Assumes userId and eventId are valid
export const assertEventHost = (userId, eventId) => eventLock((resolve, reject) => {
  if (!(events[eventId].host !== userId)) {
    reject(new InputError('Not a host of this event'));
  }

  resolve();
});

// Assumes userId and eventId are valid. Note that the host of an event
// is also a guest of that event.
export const assertEventGuest = (userId, eventId) => eventLock((resolve, reject) => {
  if (!(userId in events[eventId].guests)) {
    reject(new InputError('Not a guest in this event'));
  }

  resolve();
});

// Assumes userId is valid
export const createEvent = userId => eventLock((resolve, reject) => {
  const eventId = newEventId();
  const eventCode = generateEventCode();

  events[eventId] = {
    name: 'Untitled Event',
    host: userId,
    code: eventCode,
    permissions: {
      guestsCanInvite: true,
      guestsCanAddLocations: true,
      guestsCanAddTimes: true,
    },
    guests: {userId: STATUS.GOING},
    locations: {},
    times: {},
  };

  resolve(events[eventId]);
});

// Assumes eventId is valid
export const getEvent = eventId => eventLock((resolve, reject) => {
  resolve(events[eventId]);
});

// Assumes userId is valid
export const getJoinedEvents = userId => eventLock((resolve, reject) => {
  resolve(Object.keys(events).filter(eventId => userId in events[eventId].guests));
});

// Assumes userId and eventId are valid
export const joinEventWithId = (userId, eventId) => eventLock((resolve, reject) => {
  const joinedEvents = Object.keys(events).filter(eId => userId in events[eId].guests);
  if (eventId in joinedEvents) {
    reject(new InputError('Already joined event'));
  }

  events[eventId].guests[userId] = STATUS.MAYBE;
  resolve();
});

// Assumes userId is valid
export const joinEventWithCode = (userId, eventCode) => eventLock((resolve, reject) => {
  let eventId = Object.keys(events).find(eventId => events[eventId].code === eventCode);

  if (eventId === undefined) {
    reject(new InputError('Invalid event code'));
  }

  if (eventId in getJoinedEvents(userId)) {
    reject(new InputError('Already joined event'));
  }

  events[eventId].guests[userId] = STATUS.MAYBE;
  resolve();
});

// Assumes eventId is valid and the user performing this action is a host
export const editEventSettings = (eventId, newName, newPermissions) => eventLock((resolve, reject) => {
  if (newName) { events[eventId].name = newName; }
  if (newPermissions) { quizzes[quizId].permissions = newPermissions; }
  resolve();
});

// Assumes userId and eventId are valid and userId is a guest in eventId
export const leaveEvent = (userId, eventId) => eventLock((resolve, reject) => {
  delete events[eventId].guests[userId];
  resolve();
});

// Assumes userId and eventId are valid and userId is a guest in eventId
export const setEventStatus = (userId, eventId, status) => eventLock((resolve, reject) => {
  if (!(status in Object.keys(STATUS))) {
    reject(new InputError('Invalid status'));
  }

  events[eventId].guests[userId] = STATUS[status];
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const sendInvite = (userId, eventId, friendId) => eventLock((resolve, reject) => {
  if (!(events[eventId].host !== userId) && !events[eventId].permissions.guestsCanInvite) {
    reject(new InputError('Unpermitted action'));
  }

  if (!(friendId in users)) {
    reject(new InputError('Invalid friend ID'));
  }

  if (eventId in users[friendId].invites) {
    reject(new InputError('Friend has already been invited to this event'));
  }

  users[friendId].invites.push(eventId);
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const addLocation = (userId, eventId, location) => eventLock((resolve, reject) => {
  if (!(events[eventId].host !== userId) && !events[eventId].permissions.guestsCanAddLocations) {
    reject(new InputError('Unpermitted action'));
  }

  if (location in events[eventId].locations) {
    reject(new InputError('Location has already been added to this event'));
  }

  events[eventId].locations[location] = [];
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const addTime = (userId, eventId, time) => eventLock((resolve, reject) => {
  if (!(events[eventId].host !== userId) && !events[eventId].permissions.guestsCanAddTimes) {
    reject(new InputError('Unpermitted action'));
  }

  if (time in events[eventId].times) {
    reject(new InputError('Time has already been added to this event'));
  }

  events[eventId].times[time] = [];
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const voteLocation = (userId, eventId, location) => eventLock((resolve, reject) => {
  if (!(location in events[eventId].locations)) {
    reject(new InputError('Location has not been added'));
  }

  if (userId in events[eventId].locations[location]) {
    reject(new InputError('Already voted for this location'));
  }

  events[eventId].locations[location].push(userId);
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const voteTime = (userId, eventId, time) => eventLock((resolve, reject) => {
  if (!(time in events[eventId].times)) {
    reject(new InputError('Time has not been added'));
  }

  if (userId in events[eventId].times[time]) {
    reject(new InputError('Already voted for this time'));
  }

  events[eventId].times[time].push(userId);
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const unvoteLocation = (userId, eventId, location) => eventLock((resolve, reject) => {
  if (!(location in events[eventId].locations)) {
    reject(new InputError('Location has not been added'));
  }

  if (!(userId in events[eventId].locations[location])) {
    reject(new InputError('Have not voted for this location'));
  }

  events[eventId].locations[location].splice(indexOf(userId), 1);
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a guest
export const unvoteTime = (userId, eventId, time) => eventLock((resolve, reject) => {
  if (!(time in events[eventId].times)) {
    reject(new InputError('Time has not been added'));
  }

  if (!(userId in events[eventId].times[time])) {
    reject(new InputError('Have not voted for this time'));
  }

  events[eventId].times[time].splice(indexOf(userId), 1);
  resolve();
});

// Assumes userId and eventId are valid and the user performing this action is a host
export const deleteEvent = eventId => eventLock((resolve, reject) => {
  delete events[eventId];
  resolve();
});

/***************************************************************
                          User Functions
***************************************************************/

// Assumes userId is valid
export const getFriends = userId => userLock((resolve, reject) => {
  resolve();
});

// Assumes userId is valid
export const getInvites = userId => userLock((resolve, reject) => {
  resolve();
});

// Assumes userId is valid
export const setFriends = (userId, newFriends) => userLock((resolve, reject) => {
  resolve();
});

// Assumes userId is valid
export const setInvites = (userId, newInvites) => userLock((resolve, reject) => {
  resolve();
});
