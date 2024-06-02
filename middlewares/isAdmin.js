const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = isAdmin;