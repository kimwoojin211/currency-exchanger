/* Goals
If the API call results in an error (any message not a 200 OK), the application should return a notification to the user that states what the error is. (That means the error should show up in the DOM, not in the console.)
If the query response doesn't include that particular currency, the application should return a notification that states the currency in question doesn't exist. (Note: Even if you use a dropdown menu to specify currencies instead of a form field, you'll still need to add this functionality to your code.)
*/

/*wooj notes:
wanna add a seperate class that has all of the supported currencies and be able to populate a drop down menu from that.
*/
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function getElements(response){
  console.log("?????" + JSON.stringify(response));
  if (response){
    const convrate = response.conversion_rate;
    const base_code = response.base_code;
    const target_code = response.target_code;
    const calculated = new Intl.NumberFormat('en-US', { style: 'currency', currency: target_code }).format((1 * convrate).toFixed(2));
    $("#conversion_rate").text(convrate);
    $("#calculated").text(`${calculated} ${response.target_code}`);
    $("#base_code").text(base_code);
    $("#target_code").text(target_code);
  }
}

async function makeApiCall(currency1,currency2)
{
  const response = await CurrencyService.convert(currency1,currency2);
  console.log("ok");
  getElements(response);
}

$(".currency").on("click",function(){
  console.log("lol" + $(this).attr("id"));
  makeApiCall("124124", $(this).attr("id"));
});

$("#amount").on("submit",function(event){
  event.preventDefault();
})