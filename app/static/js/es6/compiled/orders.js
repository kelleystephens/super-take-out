(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#order').on('change', '.menu', getMenu);
    $('#add').click(addRow);
  }
  function addRow() {
    var form = $('#order').children(':last').clone();
    $('#order').append(form);
  }
  function getMenu() {
    var menu = $(this).val();
    var next = $(this).next();
    ajax(("/dishes/" + menu), 'get', null, (function(h) {
      next.empty().append(h);
    }));
  }
})();

//# sourceMappingURL=orders.map
