const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

let callbackurl = "https://learnflow-1-clzx.onrender.com/auth/google/callback";
if (process.env.NODE_ENV === "development") {
    callbackurl = "/auth/google/callback";
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: callbackurl,
        },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
            };
            try {
                let user = await User.findOne({ email: newUser.email });
                if (user) {
                    console.log("EXISTS ", user);
                    done(null, user);
                } else {
                    user = await User.create(newUser);
                    console.log("NEW ", user);
                    done(null, user);
                }
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
