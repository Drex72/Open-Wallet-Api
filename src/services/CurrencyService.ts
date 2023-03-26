import { config } from "../config";
import axios from "axios";
import Currency, { CurrencyMap } from "../models/Currency";
import sequelizeConnection from "../config/database";
class CurrencyService {
  addCurrencyToDb = async () => {
    const allCurrenciesObject = await Currency.findAll();
    if (allCurrenciesObject.length === 0) {
      const currencyData = await axios.get(
        "https://api.apilayer.com/fixer/symbols",
        {
          headers: {
            apikey: config.fixerIoApiKey,
          },
        }
      );
      const allCurrencies = Object.keys(currencyData.data?.symbols);
      await Currency.bulkCreate(
        allCurrencies.map((currency: string) => {
          return { currencyName: currency };
        })
      );
    }
  };

  convertCurrency = async (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> => {
    const apiKey = config.fixerIoApiKey;
    const queryUrl = `http://data.fixer.io/api/convert?access_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
    try {
      const convertedValue = await axios.get(queryUrl);
      console.log(convertedValue);
      return 0;
    } catch (error) {}

    return 0;
  };
}

const currencyService = new CurrencyService();
export default currencyService;
