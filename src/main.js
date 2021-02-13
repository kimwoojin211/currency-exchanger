/*wooj notes:
mer.*/

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function getElements(response){
  if (response.result==="success"){
    const convrate = response.conversion_rate;
    const base_code = response.base_code;
    const target_code = response.target_code;
    $("#conversion").text(`The conversion rate is 1 ${base_code} : ${convrate} ${target_code}`)
    $("#conversion").show();
    const amount = $("#amount").val();
    if(amount==="")
      {
        $("#calculated").text(`Try entering a valid number in the box to see how much how much ${target_code} you would have.`);
      }
    else if(isNaN(parseInt(amount)))
    {
      $("#calculated").text(`Error. Invalid amount detected. Please enter a valid number.`);
    }
    else{
      const baseamount = new Intl.NumberFormat('en-US', { style: 'currency', currency: base_code }).format(amount);
      const calculated = new Intl.NumberFormat('en-US', { style: 'currency', currency: target_code }).format(amount * convrate);
      $("#calculated").text(`${baseamount} ${base_code} = ${calculated} ${target_code}`);
    }
    $("#calculated").show();
  }
  else{
    let message = `Error! Error Code: `;
    if(response.result === "error")
    { 
      message += `${response["error-type"]} (Please ensure that both currency codes are valid ISO 4217 codes)`;
    }
    else
    {
      message += `${response}.`;
    }
    $("#conversion").text(message);
    $("#calculated").hide();
  }
}

async function loadCodes(codes) {
  const response = await CurrencyService.callForCodes();
  console.log(Object.keys(response.conversion_rates));
  Object.keys(response.conversion_rates).forEach(element => {
    codes.push[element]
  });
}

async function makeApiCall(currency1,currency2)
{
  const response = await CurrencyService.convert(currency1,currency2);
  getElements(response);
}

$("#convert").on("click",function(){
    makeApiCall($("#base_code").val(), $("#target_code").val());
});

$("input").on("submit",function(event){
  event.preventDefault();
});
