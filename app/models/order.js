/* jshint unused:false */

'use strict';

  var orders = global.nss.db.collection('orders');
  var dishes = global.nss.db.collection('dishes');
  var Mongo = require('mongodb');
  var async = require('async');
  var _ = require('lodash');

class Order{
  static create(userId, order, fn){
    var o = new Order(); //creates a blank object
    o.userId = Mongo.ObjectID(userId);
    o.date = new Date();

    var quantities = _([order.qty]).flatten().map(q=>q*1).value();
    var dishId = _([order.dishId]).flatten().map(i=>Mongo.ObjectID(i)).value();
    var meal = quantities.map((value,index)=> new Object({qty:quantities[index], dishId:dishId[index]}));

    async.map(meal, (m,fn)=>dishes.findOne({_id:m.dishId}, (err, dish)=>fn(err, {qty:m.qty, dish:dish})), (err, fullmeal)=>{
      o.totalCost = fullmeal.map(m=>m.qty * m.dish.cost).reduce((p,c)=>p+c);
      o.totalCals = fullmeal.map(m=>m.qty * m.dish.calories).reduce((p,c)=>p+c);
      o.meal = meal;
      orders.save(o, ()=>fn());
    });
  }

  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);

    orders.find({userId:userId}).toArray((e, records)=>{
      fn(records);
    });
  }

}

module.exports = Order;
