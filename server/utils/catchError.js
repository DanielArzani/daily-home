function e(res, error) {
  res.status(500).json({
    status: 'error',
    data: {
      message: error,
    },
  });
}

function eid(res, obj) {
  res.status(404).json({
    status: 'fail',
    data: {
      message: `No ${obj} found with this ID`,
    },
  });
}

module.exports = { e, eid };
