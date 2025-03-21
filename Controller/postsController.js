import PostsService from "../Service/postsService.js"
import url from "url"
import path from "path"
import fs from "fs"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const PostController = {
    getPosts : async (req,res)=>{
        try {
            const result = await PostsService.getPosts()
            if(result.status < 400){
                res.status(result.status).send({posts : result.posts, success : result.success})
            }else{
                res.status(result.status).send({message : result.message, success : result.success})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message : "Internal Server Error"})
        }
    },
    getPostById : async (req,res)=>{
        try {
            const result = await PostsService.getPostById(req.params.id)
            if(result.status < 400){
                res.status(result.status).send({post : result.post, success : result.success})
            }else{
                res.status(result.status).send({message : result.message, success : result.success})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message : "Internal Server Error"})
        }
    },
    createPost: async (req, res) => {
        try {
            const { title, content, image } = req.body;
            const userId = req.user.id;
    
            let imagePath = null;
            
            if (image) {

                const matches = image.match(/^data:image\/(\w+);base64,/);
                if (!matches) {
                    return res.status(400).send({ message: "Invalid image format", success: false });
                }
                
                const imageFormat = matches[1]; 
                const base64Data = image.replace(/^data:image\/\w+;base64,/, ""); 
                const buffer = Buffer.from(base64Data, "base64");
    
                const uploadDir = path.join(__dirname, "../uploads");
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                const filename = `post_${Date.now()}.${imageFormat}`;
                imagePath = `uploads/${filename}`; 
                const filePath = path.join(uploadDir, filename);
    
                fs.writeFileSync(filePath, buffer);
            }
    
            const result = await PostsService.createPost(title, content, imagePath, userId);
            if (result.status < 400) {
                return res.status(result.status).send({ post: result.post, success: result.success });
            } else {
                return res.status(result.status).send({ message: result.message, success: result.success });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    },
    updatePost : async (req,res)=>{
        try {
            const { title, content, image,imageIsChanged} = req.body;
            const id = req.params.id


            let imagePath = null;
            
            if (image && imageIsChanged) {

                const matches = image.match(/^data:image\/(\w+);base64,/);
                if (!matches) {
                    return res.status(400).send({ message: "Invalid image format", success: false });
                }
                
                const imageFormat = matches[1]; 
                const base64Data = image.replace(/^data:image\/\w+;base64,/, ""); 
                const buffer = Buffer.from(base64Data, "base64");
    
                const uploadDir = path.join(__dirname, "../uploads");
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                const filename = `post_${Date.now()}.${imageFormat}`;
                imagePath = `uploads/${filename}`; 
                const filePath = path.join(uploadDir, filename);
    
                fs.writeFileSync(filePath, buffer);
            }else{
                imagePath = image
            }

            const result = await PostsService.updatePost(id,title,content,imagePath)
            if(result.status < 400){
                res.status(result.status).send({post : result.post, success : result.success})
            }else{
                res.status(result.status).send({message : result.message, success : result.success})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message : "Internal Server Error"})
        }
    },
    deletePost : async (req,res)=>{
        try {
            const result = await PostsService.deletePost(req.params.id)
            res.status(result.status).send({message : result.message, success : result.success})
         
        } catch (error) {
            console.error(error)
            res.status(500).send({message : "Internal Server Error"})
        }
    }
}

export default PostController