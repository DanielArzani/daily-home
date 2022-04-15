const axios = require('axios');

/**------------------------------------------------------------------------
 *                              BIBLE API
 *------------------------------------------------------------------------**/

exports.bibleVersions = async () => {
  const response = await axios({
    method: 'get',
    url: `https://api.scripture.api.bible/v1/bibles`,
    headers: {
      'api-key': process.env.BIBLE_APP_API_KEY,
    },
  });

  const {
    // this api has an object called data with an array called data within it
    data: { data },
  } = response;

  return data;
};

exports.biblePassages = async () => {
  await axios({
    method: 'get',
    url: URL_bibles,
    headers: {
      'api-key': process.env.BIBLE_APP_API_KEY,
    },
  });

  const {
    data: { data },
  } = response;

  return data;
};

/**------------------------------------------------------------------------
 *                              IMAGE API
 *------------------------------------------------------------------------**/
