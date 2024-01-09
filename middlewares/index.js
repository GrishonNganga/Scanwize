const passport = require('passport');

const requireUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorizeddd' });
        }
        req.user = user;
        return next();
    })(req, res, next);
}

const requireAdmin = (req, res, next) => {
    console.log("User role", req.user)
    if (req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Access allowed only for admin users' });
    }
}

module.exports = {
    requireUser,
    requireAdmin
}