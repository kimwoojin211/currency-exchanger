/* I can't get the API get call to work with a decimal in the url. is this intended or is this a bug? either way, this makes me not want to use the conversion_result property if it can't convert from decimals. i'd rather just do the multiplication itself with the rate, and then display that result.

Solution: take out ${amount} from the url.
*/

export default class CurrencyService {
  static async convert(currency1, currency2, amount){
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}`);
      if(!response.ok) {
        throw Error(response.error-type);
      }
      return response.json();
    } catch(error){
      console.log("loloops");
      return error.message;
    }
  }
}