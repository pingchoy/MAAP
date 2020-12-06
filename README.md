# MAAP
COMP4511 MAAP Project Repository


## Justifications:

For our backend, we did not implement a full-scale database and instead opted to use a JSON file to store our events and users. To connect our frontend to our backend, we have designed an API that we can call from the frontend. 
Swagger documentation for our API can be found once the backend is launched. Just navigate to `localhost:5000`

For our list of locations, we have provided a list of hardcoded locations that the user can choose from. Ideally if we had more time we would have linked this section with a Google API so that we can search for new locations and add them dyanmically. However, this would have taken a substantial amount of time and we may not have the time to finish all the other components of our application if we had done this. 

For our guest component, since this was not a core element of our MVP we have decided to exclude this functionality from our beta version. At the moment, only registered users will be able to use the application. Making all the logic for guest users would have nearly doubled the amount of work that we would need to do to get the beta version working.