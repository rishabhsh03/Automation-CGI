const bcrypt = require("bcrypt");
const authRepository = require("../repositories/authRepository");

const registerUser = async ({
    name,
    email,
    phone,
    password,
    role,
    organization_id
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
        
    if (!user){
        throw new Error("Invalid email or password");
    }
            const isMatch = await bcrypt.compare(
            password,
            user.password,
            )
    if (!isMatch){
        throw new Error("Invalid email or password");
    }
    const {password:_, userWithoutPassword} = user;

    return userWithoutPassword;

    

}

module.exports ={ 
registerUser,
loginUser
}