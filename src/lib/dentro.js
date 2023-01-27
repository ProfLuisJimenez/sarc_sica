module.exports = {
    logueado(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      return res.redirect("/home");
    },
  
    nologueado(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      return res.redirect("/login");
    }
};