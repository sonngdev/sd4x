/*
 * Implement all your JavaScript in this file!
 */

$(document).ready(function() {
  var lastEntry = 0,
  lastOp = "",
  lastResult = 0,
  lastStep = "",
  newOp = "addButton",
  newResult = 0;

  $(".numbers").on("click", function() {
    // if "=" was just pressed, reset the calculator
    if (newOp === "equalsButton") {
      $("#display").attr("placeholder", "");
      $(".operators").removeClass("active");
      lastEntry = 0;
      lastOp = "";
      lastResult = 0;
      lastStep = "";
      newOp = "addButton";
      newResult = 0;
    }

    // if one of the operators was just pressed, empty the field
    if (lastStep === "operators active") {
      $("#display").attr("placeholder", "");
    }

    // display the numbers within the limit, but if "opposite" button is, at the moment, in the special state, remove that special state and insert the "-" before the number. More on this later
    if ($("#display").attr("placeholder").length < 16) {
      var plchldr = $("#display").attr("placeholder");
      plchldr += $(this).text();
      $("#display").attr("placeholder", plchldr);
    }

    // set the lastEntry to the number displayed on the screen, confirm the operators and the result, set type of button pressed (lastStep) "numbers"
    lastEntry = +$("#display").attr("placeholder");
    lastOp = newOp;
    lastResult = newResult;
    lastStep = $(this).attr("class");
  });

  $(".operators").on("click", function() {
    // make the operator in effect visible
    $(".operators").removeClass("active");
    $(this).addClass("active");

    // if the last button pressed is "=", set the temporary result to the number on screen so we can repeat the operation with consecutive "="'s, else we calculate the temporary result based on the last confirmed result, operator and last entry
    if (newOp === "equalsButton" && $(this).attr("id") !== "equalsButton") {
      newResult = +$("#display").attr("placeholder");
    } else {
      switch (lastOp) {
        case "addButton":
        newResult = lastResult + lastEntry;
        break;
        case "subtractButton":
        newResult = lastResult - lastEntry;
        break;
        case "multiplyButton":
        newResult = lastResult * lastEntry;
        break;
        case "divideButton":
        newResult = lastResult / lastEntry;
        break;
      }
    }

    // if the button is "=", confirm the result and display it. In case the number is too long to display, output it in exponent form
    if ($(this).attr("id") === "equalsButton") {
      lastResult = newResult;
      var len = lastResult.toString().length;
      if (len < 11) {
        $("#display").attr("placeholder", lastResult);
      } else {
        if (lastResult < 99999999999) {
          $("#display").attr("placeholder", lastResult.toString().slice(0,11));
        } else {
          $("#display").attr("placeholder", lastResult.toExponential(4));
        }
      }
    }

    // set the temporary operator and last step. We don't want to confirm the result and the operator yet, as user can press multiple operators at one, "-" and then "x", for example
    newOp = $(this).attr("id");
    lastStep = $(this).attr("class");
  });

  $("#clearButton").on("click", function() {
    $("#display").attr("placeholder", "");
    $(".operators").removeClass("active");
    lastEntry = 0;
    lastOp = "";
    lastResult = 0;
    lastStep = "";
    newOp = "addButton";
    newResult = 0;
  });

})
