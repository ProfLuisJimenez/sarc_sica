module.exports = {
    logueado(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }else{}
      return res.redirect("/login");
    },
  
    nologueado(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      return res.redirect("/home");
    }
};