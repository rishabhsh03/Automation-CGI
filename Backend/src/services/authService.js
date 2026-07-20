const bcrypt = require("bcrypt");
const authRepository = require("../repositories/authRepository");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const transport = require("./mailService");
const registerUser = async ({

    name,
    email,
    phone,
    password,
    role = "STAFF",
    organization_id = null
}) => {

  const existingUser =  await authRepository.findUserByEmail(email);

  if(existingUser){
      throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  
  //Save User
    const user = await authRepository.createUser(
        name,
        email,
        phone,
        hashedPassword,
        role,
        organization_id
    );
    return user;
};

const loginUser = async({
    email,
    password
}) => {
    const user = await authRepository.findUserByEmail(email);
        console.log("USER =>", user);
    if (!user){ 
        throw new Error("Invalid email or password");
    }
            const isMatch = await bcrypt.compare(
            password,
            user.password,
            )
            console.log("Password Match:", isMatch);
    if (!isMatch){
        throw new Error("Invalid email or password");
    }
    const {password:_, ...userWithoutPassword} = user;

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role

    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
);

    return{
        token,
        user:userWithoutPassword
        };
};
const forgotPassword = async (email) => {
    const user = await authRepository.findUserByEmail(email);

    if(!user){
        throw new Error("User not found");
    }
    const otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
    await authRepository.saveOTP(email,otp);

    await transport.sendMail({
        from:process.env.EMAIL_USER,

        to:email,

        subject:"Password Reset OTP",

        html:`<h2>Your OTP is ${otp}</h2>`
    });
}
module.exports ={ 
registerUser,
loginUser,
forgotPassword
}