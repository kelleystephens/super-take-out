'use strict';

var dishes = global.nss.db.collection('dishes');
var _ = require('lodash');

class Dish{

  static findAll(fn){
    dishes.find().toArray((e,d)=>fn(d));
  }

  static findMenu(fn){
    Dish.findAll(dishes=>{
      var menus = _(dishes).map(d=>d.menu).uniq().value();
      fn(menus);
    });
  }

  static findByMenu(menu, fn){
    dishes.find({menu:menu}).toArray((e, dishes)=>{
      fn(dishes);
    });
  }
}

module.exports = Dish;
