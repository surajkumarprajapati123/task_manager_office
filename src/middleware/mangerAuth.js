const jwt = require("jsonwebtoken");
const { UserModel } = require("../modles");

const ManagerAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new AppError("Unauthorized request", 401);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await UserModel.findById(decodedToken?._id).select(
      "-password"
    );

    if (!user) {
      throw new AppError("Invalid Access Token", 401);
    }

    req.user = user;
    if (user.role !== "manager") {
      res
        .status(401)
        .json({ message: " Unauthorized, Only Manager can access this" });
    }
    // console.log("user form middleware", req.user);
    // console.log("middleare is controller is ", user);
    next();
  } catch (error) {
    // Step 5: Handle authentication error
    console.log(error);
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = ManagerAuth;
