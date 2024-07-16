const { Router } = require("express");
const passport = require("passport");
const router = new Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get("/google/callback", passport.authenticate(
    'google',{
        failureRedirect:"/login",
       
    }),
    (req, res) => {}
);

module.exports = router;
