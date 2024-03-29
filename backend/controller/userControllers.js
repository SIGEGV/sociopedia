const asyncHandler = require("express-async-handler");
const Users=require("../models/UserModel");
const generateToken=require("../config/generateToken");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser= asyncHandler( async(req,res)=>{
           const{name, email,password, pic  }=req.body;
           if(!email || !password|| !name){
            res.status(400);
            throw new Error("Please enter all the Feilds");
           }
            const userExists=await Users.findOne({email});
            if(userExists){
                res.status(400);
                throw new Error("User already Exist");
            }

    const user= await Users.create({
        name,
        email,
        password,
        pic,
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Failed to create User");
    }
}
);

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await Users.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {

    };

  const users = await Users.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports={registerUser,authUser,allUsers};