import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

let validCodes = [];
loadCodes();

function getElements(response) {
  if (response.result === "success") {
    const convrate = response.conversion_rate;
    const base_code = response.base_code;
    const target_code = response.target_code;
    $("#conversion").text(`The conversion rate is 1 ${base_code} : ${convrate} ${target_code}`)
    $("#conversion").show();
    const amount = $("#amount").val();
    console.log(parseInt(amount));
    if (amount === "") {
      $("#calculated").text(`Try entering a valid number in the box to see how much how much ${target_code} you would have.`);
    }
    else if (isNaN(parseInt(amount))) {
      $("#calculated").text(`Error. Invalid amount detected. Please enter a valid number.`);
    }
    else {
      const baseamount = new Intl.NumberFormat('en-US', { style: 'currency', currency: base_code }).format(parseInt(amount));
      const calculated = new Intl.NumberFormat('en-US', { style: 'currency', currency: target_code }).format(parseInt(amount) * convrate);
      $("#calculated").text(`${baseamount} ${base_code} = ${calculated} ${target_code}`);
    }
    $("#calculated").show();
  }
  else {
    let message = `Error! Error Code: `;
    if (response.result === "error")
      message += `${response["error-type"]}`;
    else
      message += `${response}.`;
    $("#conversion").text(message);
    if (!(validCodes.includes($("#base_code").val())))
      $("#conversion").append(`<br> ${$("#base_code").val()} is not a valid ISO 4217 code`);
    if (!(validCodes.includes($("#target_code").val())))
      $("#conversion").append(`<br> ${$("#target_code").val()} is not a valid ISO 4217 code`);
    $("#calculated").hide();
  }
}

async function loadCodes() {
  const response = await CurrencyService.callForCodes();
  Object.keys(response.conversion_rates).forEach(element => {
    validCodes.push(element);
  });
}

async function makeApiCall(currency1, currency2) {
  const response = await CurrencyService.convert(currency1, currency2);
  getElements(response);
}

$("#convert").on("click", function () {
  if (validCodes.length !== 0)
    makeApiCall($("#base_code").val(), $("#target_code").val());
});

$("input").on("submit", function (event) {
  event.preventDefault();
});
