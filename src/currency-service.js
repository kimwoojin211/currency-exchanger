export default class CurrencyService {
  static async convert(currency1, currency2, amount){
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}/${amount}`);
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error){
      return error.message;
    }
  }
}