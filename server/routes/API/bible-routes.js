const router = require('express').Router();
const bible_apiController = require('../../controllers/bible_apiController.js');

/**------------------------------------------------------------------------
 * *                                INFO
 *   There will be more than one route, one for all books/chapters/verses,
 *   and one for a specific book/chapter/verse
 *
 *------------------------------------------------------------------------**/

/**------------------------------------------------------------------------
 *                             Bible Versions
 *------------------------------------------------------------------------**/
router.route('/versions').get(bible_apiController.getVersion);

/**------------------------------------------------------------------------
 *                           Books of the Bible
 *------------------------------------------------------------------------**/
router.route('/versions/books').get(bible_apiController.getBooks);

/**------------------------------------------------------------------------
 *                           Chapters of the Bible
 *------------------------------------------------------------------------**/
router.route('/versions/books/chapters').get(bible_apiController.getChapters);

/**------------------------------------------------------------------------
 *                          Verses of the Bible
 *------------------------------------------------------------------------**/
router
  .route('/versions/books/chapters/verses')
  .get(bible_apiController.getVerses);

// For random daily verse
router
  .route('/versions/books/verses/random-verse')
  .get(bible_apiController.getRandomVerse);

module.exports = router;
