import AuthService from "../Service/authService.js";

const AuthController = {
    signUp : async (req,res)=>{
        try {
            const { email, password, name } = req.body;

            const result = await AuthService.signUp(email,password,name)

            
            if(result.status < 400){
                res.status(result.status).send({message: result.message, success : result.success})
            }else{
                res.status(result.status).send({errors : result.errors , success : result.success})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message : "Internal Server Error"})
        }
    },
    signIn : async (req,res)=>{
        try {
            const { email, password } = req.body;

            const result = await AuthService.signIn(email,password)

            if(result.status < 400){
                res.status(result.status).send({message: result.message, token: result.token, success : result.success})
            }else{
                res.status(result.status).send({errors : result.errors, success : result.success})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message : "Internal Server Error"})
        }
    },
    getUser : async (req,res)=>{
        try {
            const result = await AuthService.getUser(req.user.id)
            if(result.status < 400){
                res.status(result.status).send({user : result.user, success : result.success})
            }else{
                res.status(result.status).send({message : result.message, success : result.success})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message : "Internal Server Error"})
        }
    }
}

export default AuthController