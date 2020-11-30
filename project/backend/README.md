The structure and design of this backend is closely based on the backend
provided for COMP6080 2020 T3's third assignment. Of course, the corresponding
service is totally different - COMP6080's backend supported a Kahoot-like game.



STATUS = one of GOING, MAYBE, NOTGOING

{
  "users": {
    id: {
      email: unique string
      name: string
      password: string
      invites: [event.id, ...]
      friends: [user.id, ...]
      sessionActive: boolean
    },
    ...
  },
  "events": {
    id: {
      name: string
      host: user.id
      code: unique string
      permissions: {
        guestsCanInvite: boolean,
        guestsCanAddLocations: boolean,
        guestsCanAddTimes: boolean,
      },
      guests: {user.id: STATUS, ...}
      locations: {location: [user.id], ...}
      times: {time: [user.id], ...}
    },
    ...
  }
}

