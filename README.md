# project-planner-fe

## Technologies
Project-planner-fe is created with:
* react-native: 0.70.6

## Setup
To run this project, install it locally using npm or yarn:

First of all you have to create a .env or rename the .env.example file, and complete the next fields 
```
URL_BACKEND_ANDROID=http://10.0.2.2:3001/api
URL_BACKEND_IOS=http://localhost:3001/api
````

When you run the BE, the port that you will get by default is 3001

## Step by Step
Before starting you have to run:

``` 
1. npm install / yarn install.
```

### Android

```
$ cd android
$ npm android / yarn android 
```

### ios

````
$ cd ios
$ pod install
$ npm ios / yarn ios
````

## Test

If you want to run the local tests and see the coverage, use:

`npm run test / yarn test`
