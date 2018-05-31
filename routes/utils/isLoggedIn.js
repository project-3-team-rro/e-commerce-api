function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json(false);
  }
}

module.exports = isLoggedIn;