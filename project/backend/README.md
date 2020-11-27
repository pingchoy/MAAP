The structure and design of this backend is closely based on the backend
provided for COMP6080 2020 T3's third assignment. Of course, the corresponding
service is totally different - COMP6080's backend supported a Kahoot-like game.





temporary planning

ignore all the code atm, it's just ripped from comp6080


data structure plan below

user = {
    id: unique int
    firstName: string
    loginName: unique string (email/username)
    password: string (hash)
    invites: [event.id, ...]
    events: [event.id, ...]
    friends: [user.id, ...]
}

PERMISSION = one of GUESTS_INVITE, GUESTS_ADD_LOCATIONS, GUESTS_ADD_TIMES
STATUS = one of GOING, MAYBE, NOTGOING

event = {
    id: unique int
    name: string
    host: user.id
    code: unique string
    permissions: [PERMISSION, ...]
    guests: [{user.id: user.id, status: STATUS}, ...]
    locations: [{name: string, votes: int}, ...]
    times: [{time: time, votes: int}, ...]
}

database stores {
    users: [user, ...]
    events: [event, ...]
}
