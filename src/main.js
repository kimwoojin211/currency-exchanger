/* Goals
A user should be able to enter an amount (in U.S. dollars) and then specify another currency (such as the South Korean won). The user should then see the total amount they entered in converted currency. In the example above, a user might enter 10 dollars and then see that amount in South Korean won.
Users should be able to convert U.S. currency into at least 5 other types of currency.
If the API call results in an error (any message not a 200 OK), the application should return a notification to the user that states what the error is. (That means the error should show up in the DOM, not in the console.)
If the query response doesn't include that particular currency, the application should return a notification that states the currency in question doesn't exist. (Note: Even if you use a dropdown menu to specify currencies instead of a form field, you'll still need to add this functionality to your code.)
*/

/* Wooj notes: Before that though, I need to get this API call working
uhhhhhhhhh why is it not working.
whyyyyyyyyyyyyyyyy
lolok
OH. I GOT IT. there was no response.main.

next step: convert lolok button to EUR button

*/
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

//const formula : old money(USD) x conversion rate(EUR/USD) = new money (EUR)
//                            JSON.parse(response).conversion_rate

function getElements(response){
  console.log("?????" + response);
  if (response){
    console.log("lolok1");
    $("#conversion_rate").text(response.conversion_rate);
  }
}

async function makeApiCall(currency1,currency2)
{
  console.log("ok");
  const response = await CurrencyService.convert(currency1,currency2);
  getElements(response);
}

$("#lolok").on("click",function(){
  console.log("lol");
  makeApiCall("USD","EUR");
});