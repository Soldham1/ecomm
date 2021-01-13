const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repos/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["secretkey"],
  })
);

app.get("/signup", (req, res) => {
  res.send(`
    <div>
    Your id is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="Email"><br>
            <input name="password" placeholder="Password"><br>
            <input name="passwordConfirmation" placeholder="Confirm password"><br>
            <button>Sign up</button>
        </form>
    </div>
  `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send("Email already in use...");
  }

  console.log(password);
  console.log(passwordConfirmation);

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match...");
  }

  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send("Account created");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("Logged out...");
});

app.get("/signin", (req, res) => {
  res.send(`
  <div>
      <form method="POST">
          <input name="email" placeholder="Email"><br>
          <input name="password" placeholder="Password"><br>
          <button>Sign In</button>
      </form>
  </div>
  `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email not found");
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send("Invalid password");
  }

  req.session.userId = user.id;

  res.send("Sign in successful...");
});

app.listen(3000, () => {
  console.log("API running");
});
