# quick-auth-utils

Quick tools to add some authentication to your applications. Check out the
tests for some examples, and how to use this library

## Install

```
npm install quick-auth-utils
```

## Usage

This is a small utility library to help you securely save user users passwords
and comparing those values later on for authentication.

#### ~~~~pseudo code~~~~

```
var quickAuthUtils = require('quick-auth-utils');

quickAuthUtils.extend({
  SECRET: 'test',
  ITERATIONS: 4096,
  KEY_LENGTH: 20,
  DIGEST: 'sha256',
  someValidator: function(stuff){
    return stuff === 0;
  }
});

var createUser = function(email, password, next){
  if (quickAuthUtils.validEmail(email) && quickAuthUtils.validPassword(password)){

    // check database
    if (sql('SELECT * FROM Users WHERE email = :email', email).length > 0){
      respond('That user already exists.');
    }else {
      Users.create(email, quickAuthUtils.makePasswordHash({key: email, password: password}, function(){
        next(respond(email));
      }))
    }
  }
};

creactUser('test@test.com', '123456', function(response){
  display(response);
});

var authenticateUser = function(email, password, next){
  var user = sql('SELECT * FROM Users WHERE email = :email', email);
  if (user > 0){
    var salt = user.password.split[1];
    var hash = authenticateUser.makePassowrdHash({key: email, password: password, salt: salt});

    if (hash === user.password){
      setCookie(authenticateUser.makeSecureValue(user.id))
      next('log in');
    }else {
      next('some error');
    }
  }else {
    next('this user does not exist');
  }
};

authenticateUser(request.get('email'), request.get('password'), function(response){
  display(response);
});

```

## Test

```
npm install
npm test
```
