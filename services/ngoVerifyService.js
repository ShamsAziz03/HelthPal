const axios = require('axios')

const isVerifiedNGO = async (ngoName) => {
  const url = `https://api.reliefweb.int/v1/sources?appname=NNU_healthpal_lKj99D13R&query[value]=${ngoName}`
  console.log("URL:", url)
  const { data } = await axios.get(url);
    const found = data.data.some(
      (item) => item.fields.name.toLowerCase() === ngoName.toLowerCase()
    );

    return { verified: found };
}

module.exports = { isVerifiedNGO }