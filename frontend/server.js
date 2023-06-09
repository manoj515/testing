const express = require("express");
const app = express();
const lays = require("./model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const middelware = require("./middelware");
const cors=require('cors');
app.use(cors(
  {
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET","DELETE","PUT"],
    credentials:true
  }
));
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://manojsaikumar:manojsai@ccoding.13uuyk0.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Change...")).catch(err=>{
    console.log(err)
  });
app.post("/adduser", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  try {
    const exist = await lays.findOne({ email });
    if (exist) {
      return res.status(400).send({ "Message": "Not Register" });
    }
    if (password !== confirmpassword) {
      return res.status(401).send({ "Message": "Password Not Match" });
    }
    let newaq = await lays({
      name,
      email,
      password,
      confirmpassword,
    });
    await newaq.save();
    return res.status(200).send({ "Message": "Success" });
  } catch (err) {
    console.log(err);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let exist = await lays.findOne({ email });
    if (!exist) {
      return res.status(402).send({ "Message": "Not Registerd" });
    }
    if (exist.password !== password) {
      return res.status(403).send({ "Message": "Not Match Password" });
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "keyu", { expiresIn: 4600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/getuser", middelware, async (req, res) => {
  try {
    let exist = await lays.findById(req.user.id);
    if (!exist) {
      return res.status(405).send({"Message":"No token"});
    }
    return res.json({ exist });
  } catch (err) {
    console.log(err);
  }
});
app.get("/getalldetails", async (req, res) => {
  try {
    let getalldetails = await lays.find();
    return res.json(getalldetails);
  } catch (err) {
    console.log(err);
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    await lays.findByIdAndDelete(req.params.id);
    return res.json(await lays.find());
  } catch (err) {
    console.log(err);
  }
});
app.put("/putuser/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateUser = await lays.findByIdAndUpdate(_id, req.body);
    res.send(updateUser);
  } catch (err) {
    console.log(err);
  }
});
app.listen(5000, () => console.log("Loading...."));

