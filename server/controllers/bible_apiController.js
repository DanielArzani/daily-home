const catchAsync = require('../utils/catchAsync.js');
const {
  bibleBooks,
  bibleChapters,
  bibleVerseRandom,
  bibleVerses,
  bibleVersions,
} = require('../utils/API.js');

/**-------------------------
 *     BIBLE VERSIONS
 *------------------------**/
exports.getVersion = catchAsync(async (req, res, next) => {
  // An array of bible versions
  const allVersions = await bibleVersions();

  const versionsThatIWant = allVersions.filter((ver) => {
    return (
      ver.nameLocal.includes('King James') ||
      ver.nameLocal.includes('American Standard Version')
    );
  });

  res.status(200).json({
    status: 'success',
    totalNumberOfVersions: allVersions.length,
    VersionsThatIWant: versionsThatIWant.length,
    data: {
      bibleVersions: versionsThatIWant,
      //   bibleVersions: allVersions,
    },
  });
});

/**-------------------------
 *      BIBLE BOOKS
 *------------------------**/
exports.getBooks = catchAsync(async (req, res, next) => {
  const allBooks = await bibleBooks();

  res.status(200).json({
    status: 'success',
    totalBooks: allBooks.length,
    data: {
      bibleBooks: allBooks,
    },
  });
});

/**-------------------------
 *      BIBLE CHAPTERS
 *------------------------**/
exports.getChapters = catchAsync(async (req, res, next) => {
  const allChapters = await bibleChapters();

  res.status(200).json({
    status: 'success',
    chapters: allChapters.length,
    data: {
      chapters: allChapters,
    },
  });
});

/**-------------------------
 *      BIBLE VERSES
 *------------------------**/
// All Verses
exports.getVerses = catchAsync(async (req, res, next) => {
  const allVerses = await bibleVerses();

  res.status(200).json({
    status: 'success',
    verses: allVerses.length,
    data: {
      verses: allVerses,
    },
  });
});

// Random Verse
exports.getRandomVerse = catchAsync(async (req, res, next) => {
  const randomVerse = await bibleVerseRandom();
  // console.log(randomVerse);

  res.status(200).json({
    status: 'success',
    data: {
      verse: randomVerse,
    },
  });
});
