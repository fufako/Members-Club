require("dotenv").config()
const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")

const User = require("./models/userModel")

const indexRouter = require("./routes/index")
const loginRouter = require("./routes/login")
const signupRouter = require("./routes/signup")
const logoutRouter = require("./routes/logout")

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//Database setup
const mongoose = require("mongoose")

const mongoDB = process.env.MONGO_KEY

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.use(logger("dev"))
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ name: username }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: "Incorrect username" })
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err)
        // Passwords match, log user in!
        if (res) return done(null, user)
        // Passwords do not match!
        else return done(null, false, { message: "Incorrect password" })
      })
    })
  })
)

app.use("/", indexRouter)
app.use("/login", loginRouter)
app.use("/signup", signupRouter)
app.use("/logout", logoutRouter)

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})

module.exports = app
