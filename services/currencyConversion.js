const axios = require("axios");

async function convertToILS(amount, fromCurrency) {
  try {
    const url = `https://api.frankfurter.app/latest?from=${fromCurrency}&to=ILS`;

    console.log("Currency API Request:", url);

    const response = await axios.get(url);

    const rate = response.data.rates.ILS;
    return Number(amount) * Number(rate);
  } catch (error) {
    console.error("Currency convert error:", error.response?.data || error);
    return null;
  }
}

module.exports = { convertToILS };
