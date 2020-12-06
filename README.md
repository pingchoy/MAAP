# MAAP

## Introduction
COMP4511 MAAP Project Repository

Hello. We are a group of students within the University of New South Wales course COMP4511 and we are developing a mobile application to help groups of friends organise meetups.

Some novel features we have decided to include based on user research are: 
- Being able to join events with just a code
- Being able to vote on your favourite location
- Being able to vote on your preferred time
- Being able to leave an event entirely 


## Justifications

### Backend
We have designed an web API that we call from our frontend. We did not implement a full-scale database and instead opted to use a JSON file to store our events and users.

Launch the backend by running `npm run backend`. Swagger documentation for the API can be found once the backend is launched by visiting `localhost:5000`. Connect to the backend from the frontend by setting the variable `API_BASE_URL` in `project/App.js` to `http://IP:5000` where `IP` is the IP address of the computer you are running the backend on.

The structure and design of this backend is closely based on the backend provided for COMP6080 2020 T3's third assignment. Of course, the corresponding service is totally different - COMP6080's backend supported a Kahoot-like game.

### Locations
For our list of locations, we have provided a list of hardcoded locations that the user can choose from. Ideally if we had more time we would have linked this section with a Google API so that we can search for new locations and add them dyanmically. However, this would have taken a substantial amount of time and we may not have the time to finish all the other components of our application if we had done this. 

### Guest Access
For our guest component, since this was not a core element of our MVP we have decided to exclude this functionality from our beta version. At the moment, only registered users will be able to use the application. Making all the logic for guest users would have nearly doubled the amount of work that we would need to do to get the beta version working.
