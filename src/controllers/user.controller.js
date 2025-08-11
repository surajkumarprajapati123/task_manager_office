const { UserService } = require("../services");
const {
  GenerateAccesssTokenandRefreshToken,
} = require("../services/token.service");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/CatchAsyn");

const RegisterUser = catchAsync(async (req, res) => {
  console.log("req.body", req.body);
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

const ForgatePassword = catchAsync(async (req, res) => {
  let user;
  user = await UserService.ForgotPassword(req.body.email);

  ApiResponse(
    res,
    200,
    "The registered email address is included in the link, please verify it.",
    user
  );
});
const ResetPassword = catchAsync(async (req, res) => {
  let user;
  console.log(req.params)
  console.log(req.params.token)
  user = await UserService.resetPassword(req.body, req.params.token);
  ApiResponse(res, 200, "password is change successfully", null);
});

module.exports = {
  RegisterUser,
  LoginUser,
  ForgatePassword,
  ResetPassword
};
