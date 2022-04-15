const axios = require('axios');
const catchAsync = require('./catchAsync');

const bibleId = '06125adad2d5898a-01';
const bookId = 'JER';
const chapterId = 'JER.19';
const verseId = 'JER.19.11';

/**------------------------------------------------------------------------
 * *                                INFO
 *   One of these calls gets all of something, the next one gets a single
 *   of that something
 *
 *   e.g. -> bibleVerses gets all verses and getVerse gets and shows the verse
 *         itself (instead of just a reference to it)
 *
 *   GetRandomVerse uses a different api to save some trouble of having to
 *   create loop through and get random books and verses
 *------------------------------------------------------------------------**/

/**------------------------------------------------------------------------
 *                              BIBLE API
 *------------------------------------------------------------------------**/

/**-------------------------
 *     BIBLE VERSIONS
 *------------------------**/
exports.bibleVersions = async () => {
  try {
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
  } catch (error) {
    if (error) console.log(error);
  }
};

/**-------------------------
 *       BIBLE BOOKS
 *------------------------**/
exports.bibleBooks = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.scripture.api.bible/v1/bibles/${bibleId}/books`,
      headers: {
        'api-key': process.env.BIBLE_APP_API_KEY,
      },
    });

    const {
      data: { data },
    } = response;

    return data;
  } catch (error) {
    if (error) console.log(error);
  }
};

/**-------------------------
 *      BIBLE CHAPTERS
 *------------------------**/
exports.bibleChapters = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`,
      headers: {
        'api-key': process.env.BIBLE_APP_API_KEY,
      },
    });

    const {
      data: { data },
    } = response;

    return data;
  } catch (error) {
    if (error) console.log(error);
  }
};

/**-------------------------
 *      BIBLE VERSES
 *------------------------**/
exports.bibleVerses = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}/verses`,
      headers: {
        'api-key': process.env.BIBLE_APP_API_KEY,
      },
    });

    const {
      data: { data },
    } = response;

    return data;
  } catch (error) {
    if (error) console.log(error);
  }
};

/**-------------------------
 *   RANDOM BIBLE VERSES
 *------------------------**/
exports.bibleVerseRandom = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://uncovered-treasure-v1.p.rapidapi.com/random',
      headers: {
        'X-RapidAPI-Host': 'uncovered-treasure-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'bccfc8b6e4mshd7819a907969b7dp1a0d07jsn4b9aca311614',
      },
    };

    const response = await axios(options);

    const { results } = response.data;

    return results[0];
  } catch (error) {
    if (error) console.log(error);
  }
};

/**------------------------------------------------------------------------
 *                              IMAGE API
 *------------------------------------------------------------------------**/
