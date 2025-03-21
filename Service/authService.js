import bcrypt from "bcryptjs"
import { generateAccessToken } from "../Utils/generateToken.js";
import { User } from "../Model/index.js";

const AuthService = {
    signUp : async (email,password,name)=>{
        if(email && password && name){
            const existingUser =await User.findOne({ where: { email } });
            if (existingUser) return {status: 400,  errors : [{ field : "email",message:"User already exists" }]};
          
            // const hashedPassword = await bcrypt.hash(password, 10);
            // const userId = await createUser(email, hashedPassword);
     
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword });
          
            return {status : 201, message: "The user has successfully registered, now you can sign in.",success:true }
        }else{
            let errors = []
            !email && errors.push({field:"email", message : "Email is Required"})
            !password && errors.push ({field:"password", message :"Password is Required"})
            !name && errors.push ({field:"name", message :"Name is Required"})
            return {status : 400, errors}
        }
    },
    signIn : async (email,password)=>{
        if( email && password ){
            const user = await User.findOne({ where: { email } });
            if (!user) return {status: 400, errors : [{field: "email",message: "Invalid email" }]}
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return {status: 400, errors : [{field: "password",message: "Invalid password"}] }
            
            const token = generateAccessToken({ email, id: user.id });
            return{ status: 201, message: "Login successfully", token };
        }else{
            let errors = []
            !email && errors.push({field:"email", message : "Email is Required"})
            !password && errors.push ({field:"password", message :"Password is Required"})
            return {status : 400, errors}
        }
    },
    getUser : async (id)=>{
        if(id){
            const user = await User.findByPk(id)
            if(user){
                return {status:200,user,success:true}
            }else{
                return {status:404, message:"User not found", success:false}
            }
        }else{
            return {status:400, message:"Bad Request", success:false}
        }
    }
}

export default AuthService