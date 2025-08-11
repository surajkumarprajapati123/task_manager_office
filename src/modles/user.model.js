const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the User Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter the email"],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
    },
   
    phone: {
      type: String,
      default: "123456789",
    },
  
    role: {
      type: String,
      enum: ["developer","manager","admin"],
      default: "developer",
    },
    resetToken: String,
    resetPasswordToken:String,
  resetTokenExpiration: Date
   
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


UserSchema.methods.comparePassword = async function (password) {
  const ismatch = await bcrypt.compare(password, this.password);
  // console.log("Password is from databse  ", ismatch);
  return ismatch;
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role:this.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
const user = mongoose.model("user", UserSchema);
module.exports = user;