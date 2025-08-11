const { UserModel } = require("../modles");

const GenerateAccesssTokenandRefreshToken = async (userid) => {
  try {
    const user = await UserModel.findById(userid);
    // console.log("user is ", user);
    if (!user) {
      throw new ErrorHandler("User not found", 401);
    }
    console.log("user",user)
    const AccessToken = await user.generateAccessToken();
    const RefreshToken = await user.generateRefreshToken();
    
    // console.log("save token is ", saveToken);
    return {  AccessToken, RefreshToken };
  } catch (error) {
    console.log("Error is ", error);
  }
};

module.exports = {
  GenerateAccesssTokenandRefreshToken,
};