const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="Email"><br>
            <input name="password" placeholder="Password"><br>
            <input name="password2" placeholder="Confirm password"><br>
            <button>Sign up</button>
        </form>
    </div>
  `);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Account created");
});

app.listen(3000, () => {
  console.log("API running");
});
