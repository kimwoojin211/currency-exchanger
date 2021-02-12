/*
*/

// curr
export default class CurrencyService {
  static async convert(currency1, currency2){
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}`);
      console.log("rofl " + JSON.stringify(response));
      if(!response.ok) {
        console.log("loloops");
        if (!(/^[a-z]{3}$/gi.test(currency1)) || !(/^[a-z]{3}$/gi.test(currency2)))
          throw Error("check yo codes");
      }
        else if(response.result==="error")
        throw Error(`${response.error-type}`);
      return response.json();
    } catch(error){
      console.log("loloops1");
      return error.message;
    }
  }
}