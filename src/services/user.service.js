const { UserModel } = require("../modles");
const AppError = require("../utils/AppError");

const RegisterUser = async (userdata) => {
  const { name, email, password, phone } = userdata;

  if (!name || !email || !phone || !password) {
    throw new AppError("All fields are required", 401);
  }

  if( phone.length === 10){
    throw new AppError("Mobile Number should be 10 !", 401);
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format", 401);
  }

  const invalidCharsRegex = /[\s_]/;
  if ( invalidCharsRegex.test(password)) {
    throw new AppError(
      "Username and password cannot contain spaces or underscores",
      401
    );
  }

  if (password.length < 3 || password.length > 8) {
    throw new AppError("Password must be between 3 to 8 characters", 401);
  }

  //   // Check role
  //   if (role === "admin" || role == "manager") {
  //     throw new AppError(
  //       "You are not allowed to create users with this role",
  //       401
  //     );
  //   }

  // Check if user already exists with the same email
  const existingUserWithEmail = await UserModel.findOne({ email });
  if (existingUserWithEmail) {
    throw new AppError("User with this email already exists", 401);
  }

  const user = await UserModel.create(userdata);

  return user;
};

const Login = async (userData) => {
  const { password, username, email } = userData;

  if (!email && !username) {
    throw new AppError("Enter email or username", 401);
  }
  if (!password) {
    throw new AppError("Password is required", 401);
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email && !emailRegex.test(email)) {
    throw new AppError("Invalid Email", 401);
  }

  try {
    user = await UserModel.findOne({ email });

    if (!user) {
      throw new AppError("User is not registered", 401);
    }

    const isCorrectPassword = await user.comparePassword(password);
    // console.log(isCorrectPassword);
    if (!isCorrectPassword) {
      throw new AppError("Password is incorrect", 401);
    }

    return user;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const ForgotPassword = async (email) => {
  if (!email) {
    throw new AppError("Enter the email", 400);
  }

  // Email validation regex
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(email)) {
    throw new AppError("Invalid Email", 400);
  }

  // Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Generate reset token
  const generateTokenRandom = randomString.generate({
    length: 100,
    charset: "hex",
  });

  // Set expiration (10 minutes from now)
  const resetTokenExpiration = Date.now() + 10 * 60 * 1000;

  // Save token & expiration in DB
  user.resetToken = generateTokenRandom;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  // TODO: Send email to user with reset link
  // await sendResetEmail(user.email, generateTokenRandom);

  return { message: "Reset token generated and sent successfully" };
};

module.exports = {
  RegisterUser,
  Login,
  ForgotPassword,
};
