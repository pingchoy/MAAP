import fs from 'fs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { InputError, AccessError, } from './error';
import swaggerDocument from '../data/swagger.json';
import {
  getUserIdFromAuthorization,
  login,
  logout,
  register,
  save,
  assertValidEventId,
  assertEventHost,
  assertEventGuest,
  createEvent,
  getEvent,
  getJoinedEvents,
  joinEventWithId,
  joinEventWithCode,
  editEventSettings,
  leaveEvent,
  setEventStatus,
  sendInvite,
  addLocation,
  addTime,
  voteLocation,
  voteTime,
  unvoteLocation,
  unvoteTime,
  deleteEvent,
  getFriends,
  getInvites,
  setFriends,
  setInvites
} from './service';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json({ limit: '50mb', }));

/***************************************************************
                       Helper Functions
***************************************************************/

// Wraps an sync function fn in a try-catch that shoots off any errors
const catchErrors = fn => async (req, res) => {
  try {
    await fn(req, res);
    save();
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message, });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message, });
    } else {
      console.log(err);
      res.status(500).send({ error: 'A system error ocurred', });
    }
  }
};

// Verifies the token of the request and passes the userId onto the given
// callback
const authed = fn => async (req, res) => {
  const userId = getUserIdFromAuthorization(req.header('Authorization'));
  await fn(req, res, userId);
};

/***************************************************************
                       Auth Functions
***************************************************************/

app.post('/auth/login', catchErrors(async (req, res) => {
  const { email, password, } = req.body;
  const token = await login(email, password);
  return res.json({ token, });
}));

app.post('/auth/logout', catchErrors(authed(async (req, res, userId) => {
  await logout(userId);
  return res.status(200).send({});
})));

app.post('/auth/register', catchErrors(async (req, res) => {
  const { email, name, password, } = req.body;
  const token = await register(email, name, password);
  return res.json({ token, });
}));

/***************************************************************
                       Event Functions
***************************************************************/

app.post('/event', catchErrors(authed(async (req, res, userId) => {
  await createEvent(userId);
  return res.status(200).send({});
})));

app.get('/event', catchErrors(authed(async (req, res, userId) => {
  const { eventId, } = req.body;
  await assertValidEventId(eventId);
  return res.json(await getEvent(eventId));
})));

app.get('/event/joined', catchErrors(authed(async (req, res, userId) => {
  return res.json(await getJoinedEvents(userId));
})));

app.put('/event/join/id', catchErrors(authed(async (req, res, userId) => {
  const { eventId, } = req.body;
  await assertValidEventId(eventId);
  await joinEventWithId(userId, eventId);
  return res.status(200).send({});
})));

app.put('/event/join/code', catchErrors(authed(async (req, res, userId) => {
  const { eventCode, } = req.body;
  await joinEventWithCode(userId, eventCode);
  return res.status(200).send({});
})));

app.put('/event/settings', catchErrors(authed(async (req, res, userId) => {
  const { eventId, newName, newPermissions } = req.body;
  await assertValidEventId(eventId);
  await assertEventHost(userId, eventId);
  await editEventSettings(eventId, newName, newPermissions);
  return res.status(200).send({});
})));

app.put('/event/leave', catchErrors(authed(async (req, res, userId) => {
  const { eventId, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await leaveEvent(userId, eventId);
  return res.status(200).send({});
})));

app.put('/event/status', catchErrors(authed(async (req, res, userId) => {
  const { eventId, status, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await setEventStatus(userId, eventId, status);
  return res.status(200).send({});
})));

app.put('/event/invite', catchErrors(authed(async (req, res, userId) => {
  const { eventId, friendId, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await sendInvite(userId, eventId, friendId);
  return res.status(200).send({});
})));

app.post('/event/location', catchErrors(authed(async (req, res, userId) => {
  const { eventId, location, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await addLocation(userId, eventId, location);
  return res.status(200).send({});
})));

app.post('/event/time', catchErrors(authed(async (req, res, userId) => {
  const { eventId, time, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await addTime(userId, eventId, time);
  return res.status(200).send({});
})));

app.put('/event/vote/location', catchErrors(authed(async (req, res, userId) => {
  const { eventId, location, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await voteLocation(userId, eventId, location);
  return res.status(200).send({});
})));

app.put('/event/vote/time', catchErrors(authed(async (req, res, userId) => {
  const { eventId, time, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await voteTime(userId, eventId, time);
  return res.status(200).send({});
})));

app.put('/event/unvote/location', catchErrors(authed(async (req, res, userId) => {
  const { eventId, location, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await unvoteLocation(userId, eventId, location);
  return res.status(200).send({});
})));

app.put('/event/unvote/time', catchErrors(authed(async (req, res, userId) => {
  const { eventId, time, } = req.body;
  await assertValidEventId(eventId);
  await assertEventGuest(userId, eventId);
  await unvoteTime(userId, eventId, time);
  return res.status(200).send({});
})));

app.delete('/event', catchErrors(authed(async (req, res, userId) => {
  const { eventId, } = req.body;
  await assertValidEventId(eventId);
  await assertEventHost(userId, eventId);
  await deleteEvent(eventId);
  return res.status(200).send({});
})));

/***************************************************************
                          User Functions
***************************************************************/

app.get('/user/friends', catchErrors(async (req, res) => {
  return res.status(200).send({ playerId, });
}));

app.get('/user/invites', catchErrors(async (req, res) => {
  return res.status(200).send({ playerId, });
}));

app.put('/user/friends', catchErrors(async (req, res) => {
  return res.status(200).send({ playerId, });
}));

app.put('/user/invites', catchErrors(async (req, res) => {
  return res.status(200).send({ playerId, });
}));

/***************************************************************
                       Running Server
***************************************************************/

app.get('/', (req, res) => res.redirect('/docs'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`Backend is now listening on port ${PORT}!`);
});

export default server;