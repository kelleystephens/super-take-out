'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');

//purpose is to pull dishes from db and show the orders page
exports.new = (req, res)=>{
  Dish.findMenu(menus=>{
    User.findByUserId(req.session.userId, user=>{
      debugger;
        res.render('orders/new', {user:user, menus:menus, title: 'Order Food'});
    });
  });
};

exports.create = (req, res)=>{
  Order.create(req.session.userId, req.body, ()=>res.redirect('/orders/history'));
};

// exports.history = ()=>{
//   User.findByUserId(req.session.userId, user=>{
//     Order.findAllByUserId
//   });
// }
