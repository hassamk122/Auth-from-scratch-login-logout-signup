const express = require("express");

const router = express.Router();
const { getUser } = require("../service/auth");

router.get("/", (request, response) => {
  const userUid = request.cookies.uid;

  const user = getUser(userUid);
  return response.render("home", {
    user: user,
  });
});

router.get("/signup", (request, response) => {
  return response.render("signup");
});
router.get("/login", (request, response) => {
  return response.render("login", { error: null });
});

router.get("/logout", (request, response) => {
  response.clearCookie("uid");
  return response.redirect("/login");
});
module.exports = router;
