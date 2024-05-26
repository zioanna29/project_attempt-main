
$(document).ready(function(){
    // Initialize the datepickers for date range selection
    $('#start-date').datepicker({
        format: 'yyyy-mm-dd',
        language: 'el',
        autoclose: true,
        todayHighlight: false
    }).on('changeDate', function (selected) {
        var startDate = new Date(selected.date.valueOf());
        $('#end-date').datepicker('setStartDate', startDate);
    });

    $('#end-date').datepicker({
        format: 'yyyy-mm-dd',
        language: 'el',
        autoclose: true,
        todayHighlight: false
    }).on('changeDate', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        $('#start-date').datepicker('setEndDate', endDate);
    });
});


const resetButton = document.getElementById("resetButtonDiorganwseis");
  resetButton.addEventListener("click", function() {
    // Clear specific form elements
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";

    // Alternatively, reset the entire form using JavaScript
    document.getElementById("diorganwseis-filter").reset();
  });



//hide inputs if checkboxes arent checked
var form = $('#diorganwseis-filter'),
checkbox = $('#agwnistikh'),
checkboxBlock = $('#changeAgwnistikh');

checkboxBlock.hide();

checkbox.on('click', function() {
   if($(this).is(':checked')) {
      checkboxBlock.show();
      console.log(checkboxBlock.value)
      checkboxBlock.find('input').attr('required', true);
   } else {
      checkboxBlock.hide();
      checkboxBlock.find('input').attr('required', false);
   }
});


var form2 = $('#diorganwseis-filter'),
checkbox2 = $('#kathgoria'),
checkboxBlock2 = $('#changeKathgoria');

checkboxBlock2.hide();

checkbox2.on('click', function() {
   if($(this).is(':checked')) {
      checkboxBlock2.show();
      checkboxBlock2.find('input').attr('required', true);
   } else {
      checkboxBlock2.hide();
      checkboxBlock2.find('input').attr('required', false);
   }
});

var form3 = $('#diorganwseis-filter'),
checkbox3 = $('#hmeromhnia'),
checkboxBlock3 = $('#datepicker');

checkboxBlock3.hide();

checkbox3.on('click', function() {
   if($(this).is(':checked')) {
      checkboxBlock3.show();
      checkboxBlock3.find('input').attr('required', true);
   } else {
      checkboxBlock3.hide();
      checkboxBlock3.find('input').attr('required', false);
   }
});




