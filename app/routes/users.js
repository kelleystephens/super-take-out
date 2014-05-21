'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

//purpose is to show the login page
exports.new = (req, res)=>{
  res.render('users/new', {title: 'User Registration/Login'});
};

//purpose is to pull the login info and make new user
exports.login = (req, res)=>{
  var user = new User(req.body);
  user.login(u=>{
    if(u){
      req.session.userId = u._id; //makes a cookie storing userId
      res.redirect('/orders');
    }else{
      req.session.userId = null;
      res.redirect('/login');
    }
  });
};
