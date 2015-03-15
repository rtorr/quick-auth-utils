'use strict';

var assert = require('assert');

var quickAuthUtils = require('./../index');

var testValue = 'test|cd4b0dcbe0f4538b979fb73664f51abe';

describe('quick-auth-utils', function(){

  describe('extend', function(){
    it('should set new values on the quick auth object', function(){
      quickAuthUtils.extend({SECRET: 'test'});
      assert.equal('test', quickAuthUtils.SECRET);
    });
  });

  describe('validEmail', function(){
    it('should return a boolean if the string is a valid email address', function(){
      assert.equal(quickAuthUtils.validEmail('foo@bar.com.au'), true);
      assert.equal(quickAuthUtils.validEmail('x@x.x'), true);
      assert.equal(quickAuthUtils.validEmail('foo+bar@bar.com'), true);
      assert.equal(quickAuthUtils.validEmail('hans.m端ller@test.com'), true);
      assert.equal(quickAuthUtils.validEmail('hans@m端ller.com'), true);
      assert.equal(quickAuthUtils.validEmail('test|123@m端ller.com'), true);
      assert.equal(quickAuthUtils.validEmail('test+ext@gmail.com'), true);
      assert.equal(quickAuthUtils.validEmail('some.name.midd.leNa.me.+extension@GoogleMail.com'), true);
      assert.equal(quickAuthUtils.validEmail('invalidemail@'), false);
      assert.equal(quickAuthUtils.validEmail('invalidemail@'), false);
      assert.equal(quickAuthUtils.validEmail('invalid.com'), false);
      assert.equal(quickAuthUtils.validEmail('@invalid.com'), false);
      assert.equal(quickAuthUtils.validEmail('foo@bar.com.'), false);
      assert.equal(quickAuthUtils.validEmail('foo@bar.co.uk.'), false);
      assert.equal(quickAuthUtils.validEmail('Some Name <invalidemail@>'), false);
      assert.equal(quickAuthUtils.validEmail('Some Name <invalid.com>'), false);
      assert.equal(quickAuthUtils.validEmail('Some Name <@invalid.com>'), false);
      assert.equal(quickAuthUtils.validEmail('Some Name <foo@bar.com.>'), false);
      assert.equal(quickAuthUtils.validEmail('Some Name <foo@bar.co.uk.>'), false);
      assert.equal(quickAuthUtils.validEmail('Some Name foo@bar.co.uk.>'), false);
      assert.equal(quickAuthUtils.validEmail('Some Name <foo@bar.co.uk.'), false);
      assert.equal(quickAuthUtils.validEmail('Some Name < foo@bar.co.uk >'), false);
      assert.equal(quickAuthUtils.validEmail('Name foo@bar.co.uk'), false);
    });
  });

  describe('validPassword', function(){
    it('password should be between 3 and 20 characters', function(){
      assert.equal(quickAuthUtils.validPassword(1), false);
      assert.equal(quickAuthUtils.validPassword(123), true);
      assert.equal(quickAuthUtils.validPassword(12345678910111213141), true);
      assert.equal(quickAuthUtils.validPassword(123456789101112131415), false);
    });
  });

  describe('validPassword', function(){
    it('password should be between 3 and 20 characters', function(){
      assert.equal(quickAuthUtils.validPassword(1), false);
      assert.equal(quickAuthUtils.validPassword(123), true);
      assert.equal(quickAuthUtils.validPassword(12345678910111213141), true);
      assert.equal(quickAuthUtils.validPassword(123456789101112131415), false);
    });
  });

  describe('makeSecureValue', function(){
    it('create new md5 hash with our secret', function(){
      assert.equal(quickAuthUtils.makeSecureValue(quickAuthUtils.SECRET), testValue);
    });
  });

  describe('checkSecureValue', function(){
    it('create new md5 hash with our secret', function(){
      assert.equal(quickAuthUtils.makeSecureValue(quickAuthUtils.SECRET), testValue);
      assert.notEqual(quickAuthUtils.makeSecureValue('test1'), 'test|cd4b0dcbe0f4538b979fb73664f51abe');
    });
  });

  describe('makeSalt', function(){
    it('make random characters for salts', function(){
      assert.notEqual(quickAuthUtils.makeSalt(), quickAuthUtils.makeSalt());
    });
  });

  describe('makePasswordHash', function(){
    it('creat new user password + salt hash', function(){
      assert.equal(quickAuthUtils.makePasswordHash('username', 'password', 'salt'), '1606af4a1514e15097ecc3a82653f1f4ce8ec79be5291d0df792187273e408c2|salt');
      assert.notEqual(quickAuthUtils.makePasswordHash('username', 'password'), '1606af4a1514e15097ecc3a82653f1f4ce8ec79be5291d0df792187273e408c2|salt',
      'should always have a random salt');
    });
  });

  describe('creat user flow', function(){
    it('create a new user', function(){
      var email = 'john@google.com';
      var password = 'secrets123456';

      if (quickAuthUtils.validEmail(email) && quickAuthUtils.validPassword(password)){
        //Salt is random each time, so good luck guessint the value :)
        assert.equal(quickAuthUtils.makePasswordHash(email, password).length, 70);
      }

    });
  });

});
