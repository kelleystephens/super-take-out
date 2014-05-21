'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');

//purpose is to pull dishes from db and show the orders page
exports.new = (req, res)=>{
  Dish.findMenu(menus=>{
    User.findByUserId(req.session.userId, user=>{
        res.render('orders/new', {user:user, menus:menus, title: 'Order Food'});
    });
  });
};
