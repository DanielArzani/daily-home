const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync.js');
const { bibleVersions } = require('../utils/API.js');

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
 *     BIBLE PASSAGES
 *------------------------**/
