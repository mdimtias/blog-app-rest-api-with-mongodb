const router = require("express").Router();
const User = require("./../models/User.js");
const bcrypt = require("bcrypt");

// Update User
router.put("/:userId", async (req, res) => {
  if (req.body.userId === req.params.userId) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(updateUser);
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "You can update only your account" });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  if (req.body.userId === req.params.id) {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(deleteUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "You can delete only your account" });
  }
});

// Get User By Id
router.get("/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({ message: "User Not Found" });
        }
        const {password, ...others} = user._doc;
        res.status(200).json(others)
    }catch(err){
      res.status(500).json(err);
    }
})

// // Get All User 
// router.get("/", async (req, res)=>{
//     try{
//         const user = await User.find()
//         if(!user){
//             return res.status(400).json({ message: "No User Found" });
//         }
//         res.status(200).json(user)
//     }catch(err){
//       res.status(500).json(err);
//     }
// })


module.exports = router;

