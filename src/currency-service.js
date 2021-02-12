
export default class CurrencyService {
  static async convert(currency1, currency2){
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}`);
      console.log("response status = " + response.status);
      if(!response.ok) {
          throw Error(response.status);
      }
      return response.json();
    } catch(error){
      return error.message;
    }
  }
}