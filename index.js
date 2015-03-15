'use strict';

var validator = require('validator');
var cry = require('crypto');
var extend = require('amp-extend');
var randomstring = require('randomstring');

var authUtils = {
  extend: function(configObj){
    return extend(this, configObj);
  },
  validEmail: function(email){
    return validator.isEmail(email);
  },
  validPassword: function(password){
    return validator.isLength(password, 3, 20);
  },
  makeSecureValue: function(s){
    return s+'|'+ cry.createHmac('md5', this.SECRET).update(s).digest('hex');
  },
  checkSecureValue: function(h){
    var value = h.split('|')[0];
    if (h === this.makeSecureValue(h)){
      return value;
    }
  },
  makeSalt: function(){
    return randomstring.generate(5);
  },
  makePasswordHash: function(options, cb){
    var salt = options.salt || this.makeSalt();
    var h = cry.pbkdf2(options.key + options.password, salt, this.ITERATIONS, this.KEY_LENGTH, this.DIGEST, function(err, key){
      if (err){
        throw new Error(err);
      }
      cb(key.toString('hex') + '|' + salt);
    });
  }
};

module.exports = authUtils;
