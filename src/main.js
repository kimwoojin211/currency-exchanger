/* Goals
A user should be able to enter an amount (in U.S. dollars) and then specify another currency (such as the South Korean won). The user should then see the total amount they entered in converted currency. In the example above, a user might enter 10 dollars and then see that amount in South Korean won.
Users should be able to convert U.S. currency into at least 5 other types of currency.
If the API call results in an error (any message not a 200 OK), the application should return a notification to the user that states what the error is. (That means the error should show up in the DOM, not in the console.)
If the query response doesn't include that particular currency, the application should return a notification that states the currency in question doesn't exist. (Note: Even if you use a dropdown menu to specify currencies instead of a form field, you'll still need to add this functionality to your code.)
*/

/* Wooj notes: I have the conversion key. now I need to come up with my list of currencies.

*/
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

//const formula : old money(USD) x conversion rate(EUR/USD) = new money (EUR)
//                            JSON.parse(response).conversion_rate

function getElements(response){
  if (response.main){
    console.log(response.main.conversion_rate);
  }
}

async function makeApiCall(currency1,currency2)
{
  const response = await CurrencyService.convert(currency1,currency2);
  getElements(response);
}

makeApiCall("USD","EUR");