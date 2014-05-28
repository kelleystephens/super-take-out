(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#order').on('change', '.menu', getMenu);
    $('#add').click(addRow);
    $('#order').on('click', '.remove', remove);
    $('#order').on('change', '.dish', changeText);
    $('#order').on('change', 'input', changeText);
    $('#placeorder').click(placeOrder);
  }
  function placeOrder() {
    $('#order').submit();
  }
  function changeText() {
    var items = $('.formwrapper').toArray();
    var total = 0;
    var totalCals = 0;
    items.forEach((function(i) {
      if ($(i).children('.dish').find('option:selected').attr('data-cost') && ($(i).children('.qty').val() * 1) > 0) {
        var qty = $(i).children('.qty').val() * 1;
        var cost = $(i).children('.dish').find('option:selected').attr('data-cost') * 1;
        var sum = qty * cost;
        total += sum;
        totalCals += qty * ($(i).children('.dish').find('option:selected').attr('data-cals') * 1);
      }
    }));
    $('#totalcost').text(("Total: $" + total.toFixed(2)));
    $('#totalcals').text(("Total Calories: " + totalCals));
  }
  function remove(e) {
    if ($('.formwrapper').length > 1) {
      $(this).parent().remove();
      changeText();
    }
    e.preventDefault();
  }
  function addRow() {
    var form = $('#order').children(':last').clone();
    $('#order').append(form);
    $('.qty').last().val('');
  }
  function getMenu() {
    var menu = $(this).val();
    var next = $(this).next();
    ajax(("/dishes/" + menu), 'get', null, (function(h) {
      next.empty().append(h);
      changeText();
    }));
  }
})();

//# sourceMappingURL=orders.map
