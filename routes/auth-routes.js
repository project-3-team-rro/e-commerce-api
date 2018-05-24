const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
// User model
const User = require("../models/user");

const flash = require("connect-flash");

const ensureLogin = require("connect-ensure-login");



// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

// authRoutes.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  if (username === "" || password === "") {
    res.status(400).json({
      message: 'Provide username and password'
    });
    return;
  }

  User.findOne({
    username: username
  }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({
        message: 'The username already exists'
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
      role: role,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err)
        res.status(400).json({
          message: 'Something went wrong'
        });
        return;
      }

      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({
            message: 'Something went wrong'
          });
          return;
        }
        res.status(200).json(req.user);
      });
    });
  });
});

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong'
      });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({
          message: 'Something went wrong'
        });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

authRoutes.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'Success'
  });
});

authRoutes.get('/loggedin', (req, res, next) => {
  console.log(req.user)
  if (req.isAuthenticated()) {
    res.json(req.user);
    return;
  }

  res.json({
    message: 'Unauthorized'
  });
});

authRoutes.post("/updateprofile/:id", (req, res, next) => {
	const email = req.body.email;
	// if(password !== "") { const password = req.body.password; };
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const city = req.body.city;
  const zip = req.body.zip;
  const bio = req.body.bio;
	
	User.findByIdAndUpdate(req.params.id, {
		email: email,
    address1: address1,
    address2: address2,
    city: city,
    zip: zip,
    bio: bio,
	})
  	.then(res.redirect("/profile"))
  	.catch();
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {

    res.redirect('/login')
  }
}

function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/')
    }
  }
}

authRoutes.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({
      message: 'This is a private message'
    });
    return;
  }

  res.status(403).json({
    message: 'Unauthorized'
  });
});

// authRoutes.get("/auth/google", passport.authenticate("google", {
//   scope: ["https://www.googleapis.com/auth/plus.login",
//     "https://www.googleapis.com/auth/plus.profile.emails.read"
//   ]
// }));

// authRoutes.get("/auth/google/callback", passport.authenticate("google", {
//   failureRedirect: "/",
//   successRedirect: "/private-page"
// }));

module.exports = authRoutes;