module.exports = ({ req }) => {
  return `
    <div>
    Your id is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="Email"><br>
            <input name="password" placeholder="Password"><br>
            <input name="passwordConfirmation" placeholder="Confirm password"><br>
            <button>Sign up</button>
        </form>
    </div>
    `;
};
