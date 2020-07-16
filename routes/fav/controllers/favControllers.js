const Fav = require('../models/Fav');
module.exports = {
  createUserFav: (req, res) => {
    // console.log("createUserFav")
    let fav = new Fav();
    fav.owner = req.user._id;
    fav.save((error) => {
      if (error) {
        return res
          .status(500)
          .json({ confirmation: 'failure', message: error });
      } else {
        return res.redirect("/api/users");
      }
    });
  }
};