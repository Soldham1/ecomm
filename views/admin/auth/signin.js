const layout = require("../layout");

module.exports = () => {
  return layout({
    content: `
      <div>
        <form method="POST">
            <input name="email" placeholder="Email"><br>
            <input name="password" placeholder="Password"><br>
            <button>Sign In</button>
        </form>
      </div>
    `,
  });
};
