const users = require("../models/users");

const verifyAdmin = async (req, res, next) => {
  const email = req.user.email;

  try {
    // find the user by email
    const user = await users.findOne({ email });

    // Check if the user exists and has the role of admin
    const isAdmin = user?.role === "admin";
    // const isModerator = user?.role === "moderator";

    if (!isAdmin) {
      return res.status(403).send({ message: "Forbidden access" });
    }

    next();
  } catch (error) {
    console.error("Error verifying admin:", error);

    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = verifyAdmin;
