import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function getElements(response) {
  let codes = $("#dropdownBase>option");
  let codes2 = [];
  for(let element of codes){
    codes2.push(element.value);
  }
  if (response.result === "success") {
    const convrate = response.conversion_rate;
    const base_code = response.base_code;
    const target_code = response.target_code;
    $("#conversion").text(`The conversion rate is 1 ${base_code} : ${convrate} ${target_code}`);
    $("#conversion").show();
    let amount = $("#amount").val();
    if (amount === "") {
      $("#calculated").text(`Try entering a valid number in the box to see how much ${target_code} you would have.`);
    }
    else if (/[^\d.,]/.test(amount)) {
      $("#calculated").text(`Error. Invalid amount detected. Please enter a valid number.`);
    }
    else {
      amount = amount.replace(/,/g,"");
      const baseamount = new Intl.NumberFormat('en-US', { style: 'currency', currency: base_code }).format(parseFloat(amount));
      const calculated = new Intl.NumberFormat('en-US', { style: 'currency', currency: target_code }).format(parseFloat(amount) * convrate);
      $("#calculated").text(`${baseamount} = ${calculated}`);
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
    if (!(codes2.includes($("#base_code").val())))
      $("#conversion").append(`<br> ${$("#base_code").val()} is not a valid ISO 4217 code`);
    if (!(codes2.includes($("#target_code").val())))
      $("#conversion").append(`<br> ${$("#target_code").val()} is not a valid ISO 4217 code`);
    $("#calculated").hide();
  }
}


async function makeApiCall(currency1, currency2) {  
  const codeObject = await CurrencyService.callForCodes();
  const codes = Object.keys(codeObject.conversion_rates);
  const response = await CurrencyService.convert(currency1, currency2);
  getElements(response,codes);
}

async function getCodes() {
  const codeObject = await CurrencyService.callForCodes();
  const codes = Object.keys(codeObject.conversion_rates);
  dropDown(codes);
}

function dropDown(codes){
  for (let i = 0; i < codes.length; i++) {
    $("#dropdownBase")[0].innerHTML = $("#dropdownBase")[0].innerHTML + `<option value="${codes[i]}">`;
    $("#dropdownTarget")[0].innerHTML = $("#dropdownTarget")[0].innerHTML + `<option value="${codes[i]}">`;
  }
}


getCodes();

$("#convert").on("click", function () {
  makeApiCall($("#base_code").val(), $("#target_code").val());
});

$("input").on("submit", function (event) {
  event.preventDefault();

});
