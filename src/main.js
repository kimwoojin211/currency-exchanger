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
  if (response.result==="success"){
    $("#broken").hide();
    const convrate = response.conversion_rate;
    const base_code = response.base_code;
    const target_code = response.target_code;
    $("#conversion").text(`The conversion rate is 1 ${base_code} : ${convrate} ${target_code}`)
    const amount = $("#amount").val();
    if(amount==="")
      {
        $("#calculated").text(`Try entering a valid number in the box  box to see how much how much ${target_code} you would have.`);
      }
    else if(isNaN(parseInt(amount)))
    {
      $("#calculated").text(`Error. Invalid amount detected. Please enter a valid number.`);
    }
    else{
      const baseamount = new Intl.NumberFormat('en-US', { style: 'currency', currency: base_code }).format(amount);
      const calculated = new Intl.NumberFormat('en-US', { style: 'currency', currency: target_code }).format(amount * convrate);
      $("#calculated").text(`${baseamount} ${base_code} = ${calculated} ${target_code}`);
      $("#conversion").show();
    }
    $("#output").show();
  }
  else{
    $("#output").hide();
    let message = "Error! "
    if(response.result === "error") //request goes through, but gets an error 
    // if more than 3 letters, then error-type: malformed request
    // if less than 3 letters or 3 letters, but no match, then error-type: unsupported code
      message += `${response["error-type"]}`;
    else // if not right format (includes numbers), then it returns a 404
      message += `${response}`;
    $("#error").text(message);
    $("#broken").show();

  }
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
})