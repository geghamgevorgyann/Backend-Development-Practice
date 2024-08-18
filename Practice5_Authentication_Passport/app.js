import express from "express";
import session from "express-session";
import path from "path";
import bcypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";

let users = [];
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new passportLocal.Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = users.find((user) => user.email === email);
      if (user) {
        const passwordMatch = await bcypt.compare(password, user.password);
        if (passwordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } else {
        return done(null, null, { message: "User not found" });
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(
    null,
    users.find((user) => user.id === id)
  );
});

app.get("/register",checkNotAuthenticated, (req, res) => {
  res.sendFile(path.resolve("views/register.html"));
});

app.post("/register",async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcypt.hash(password, 10);
  users.push({
    id: `${Date.now()}_${Math.random()}`,
    name,
    email,
    password: hashedPassword,
  });
  console.log(users);

  res.redirect("/login");
});
app.get("/login", checkNotAuthenticated, (req, res) => {
  res.sendFile(path.resolve("views/login.html"));
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.use(checkAuthenticated);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("views/app.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
})
function checkAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
       return res.redirect("/");
    }
    next();
  }

app.listen(process.env.PORT_NUMBER, () =>
  console.log(`Server running on port ${process.env.PORT_NUMBER}`)
);
