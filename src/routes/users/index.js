const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifyToken");
const users = require("../../models/users");
// const
const router = require("express").Router();

// get method
router.get("/users", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    console.log(req.user);
    const result = await users.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// check user role
router.get("/users/checkRole/:email", verifyToken, async (req, res, next) => {
  try {
    const email = req.params.email;

    if (req.user.email !== email) {
      return res.status(403).send({ message: "unauthorized access" });
    }
    const query = { email: email };

    const user = await users.findOne(query);
    let role = "";
    if (user) {
      role = user?.role;
    }
    res.send({
      role,
      userId: user._id,
      email: user.email,
      subscription: user?.subscription,
    });
  } catch (error) {
    next(error);
  }
});
// post method
router.post("/users", async (req, res, next) => {
  try {
    const user = req.body;
    const result = await users.insertMany(user);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// update role
// router.put("/users/:id", async (req, res, next) => {
//   try {
//     const filter = { _id: req.params.id };
//     const role = req.body.role;
//     const newRole = {
//       $set: {
//         role: role,
//       },
//     };

//     // Validate request data
//     if (!role) {
//       return res.status(400).json({ error: "Role is required" });
//     }

//     const result = await users.updateOne(filter, newRole);
//     // Check if a document was modified
//     if (result.nModified === 0) {
//       return res
//         .status(404)
//         .json({ error: "User not found or role not modified" });
//     }

//     return res.json({ message: "User role updated successfully", result });
//   } catch (error) {
//     next(error);
//   }
// });

// Update user's role and/or subscription
router.put("/users/:id", async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    const role = req.body.role;
    const subscription = req.body.subscription;

    // Validate request data
    if (!role && !subscription) {
      return res
        .status(400)
        .json({ error: "Role or subscription is required" });
    }

    // Update role if provided
    if (role) {
      const newRole = {
        $set: {
          role: role,
        },
      };

      const result = await users.updateOne(filter, newRole);
      // Check if a document was modified
      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ error: "User not found or role not modified" });
      }
    }

    // Update subscription if provided
    if (subscription) {
      const newSubscription = {
        $set: {
          subscription: subscription,
        },
      };

      const result = await users.updateOne(filter, newSubscription);
      // Check if a document was modified
      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ error: "User not found or subscription not modified" });
      }
    }

    return res.json({success:true, message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
