import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import User from "../models/User.js";

const router = express.Router();


//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);


router.post("/register", async (req, res) => {

    const { username, email,country,city,phone,password, } = req.body;

    if (!username || !email || !country || !city|| !password || !phone) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        }  else {
            const finalUser = new User({
                username, email, country,city,phone,password
            });

            // here password hasing

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(200).json({ status: 200, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
       // console.log("catch block error");
    }

});


export default router;