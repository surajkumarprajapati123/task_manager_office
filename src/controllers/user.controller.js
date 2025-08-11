const { UserService } = require("../services");
const {
  GenerateAccesssTokenandRefreshToken,
} = require("../services/token.service");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/CatchAsyn");

const RegisterUser = catchAsync(async (req, res) => {
  console.log("req.body",req.body)
  let user = await UserService.RegisterUser(req.body);
  ApiResponse(res, 201, `User is created Successfully !`, user);
});

const LoginUser = catchAsync(async (req, res) => {
  let user;

  user = await UserService.Login(req.body);

  const { AccessToken, RefreshToken } =
    await GenerateAccesssTokenandRefreshToken(user._id);

  res
    .status(200)
    // Set cookies for AccessToken and RefreshToken
    .cookie("AccessToken", AccessToken)
    .cookie("RefreshToken", RefreshToken)
    .json({
      message: "User logged in successfully",
      success: true,
      tokens: {
        access: {
          AccessToken,
        },
        refresh: {
          RefreshToken,
        },
      },
    });
});

module.exports = {
  RegisterUser,
  LoginUser,
};
