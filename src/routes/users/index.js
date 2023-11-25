const users = require("../../models/users");

const router = require("express").Router();

router.post("/users", async (req, res) => {
  const user = req.body;
  const result = await users.insertMany(user);
  res.send(result);
});

module.exports = router;
