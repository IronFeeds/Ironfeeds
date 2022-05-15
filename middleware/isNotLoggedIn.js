function isNotLoggedIn(req, res, next) {
	if (req.session.currentUser) {
		res.redirect('/views/login');
	} else {
		next();
	}
}

module.exports = isNotLoggedIn;
