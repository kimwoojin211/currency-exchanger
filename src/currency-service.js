/*
*/

// curr
export default class CurrencyService {
  static async convert(currency1, currency2){
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}`);
      if(!response.ok) {
        if (!(/^[a-z]{3}$/gi.test(currency1)) || !(/^[a-z]{3}$/gi.test(currency2)))
          throw Error("Invalid format detected");
      }
      // else if(response.result==="error")
      //   console.log("boop" + response.error-type);
      //   throw Error(`${response.error-type}`);

      return response.json();
    } catch(error){
      return error.message;
    }
  }
}