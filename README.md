# Bored API
Find something better to do faster

## About
This project is a server-side rendered Express.js app that has a goal of creating a simple way to find things to do.

## Endpoints
The full documentation can be found [here](https://www.boredapi.com/documentation), but listed below are a few of the endpoints

#### Random event
Gets a random event
```
/api/activity/
```
Response:
```
{
  "activity": "Learn Express.js",
  "accessibility": 0.25,
  "type": "education",
  "participants": 1,
  "price": 0.1,
  "link": "https://expressjs.com/",
  "key": "3943506"
}
```

#### Get by type
Query for events by a certain type
```
/api/activity?type=:type
```
Response:
```
{
  "activity": "Learn how to play a new sport",
  "accessibility": 0.2,
  "type": "sports",
  "participants": 1,
  "price": 0.1,
  "key": "5808228"
}
```

## Using
To set up your own Bored API, clone the app and run:
```bash
npm install
# Start MongoDB
npm run prod
# App started on port 8080
```

## Contributing
All help is welcome! A pull request or a new issue respectively would be very appreciated.
