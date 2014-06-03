'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');

//purpose is to pull dishes from db and show the orders page
exports.new = (req, res)=>{
  Dish.findMenu(menus=>{
    User.findByUserId(req.session.userId, user=>{
        res.render('orders/new', {user:user, menus:menus, title: 'Order Food'});
    });
  });
};

exports.create = (req, res)=>{
  Order.create(req.session.userId, req.body, ()=>res.redirect('/orders/history'));
};

exports.history = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    Order.findAllByUserId(req.session.userId, orders=>{
      res.render('orders/history', {orders:orders, user:user, title:'Order History'});
    });
  });
};
