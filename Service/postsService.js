import { Post, User } from '../Model/index.js';


const PostsService = {
    getPosts : async ()=>{
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'name'], 
            },
        });
    
        if(posts.length > 0){
            return {status:200,posts,success:true}
        }else{
            return {
                status:200,
                message:"No posts found",
                success:false
            }
        }
    },
    getPostById : async (id)=>{
        if(id){
            const post = await Post.findByPk(id,{
                include: {
                    model: User,
                    attributes: ['id', 'name'], 
                },
            });
            if(post){
                return {status:200,post,success:true}
            }else{
                return {status:404, message:"Post not found", success:false}
            }
        }else{
            return {status:400, message:"Bad Request", success:false}
        }
    },
    createPost : async (title,content,imageURL,userId)=>{
        if(title,content,imageURL,userId){
            const post = await Post.create({ title, content, imageURL, userId});
            return {status:201,post,success:true}
        }else{
            return {status:400, message:"Bad Request", success:false}
        }
    },
    updatePost : async (id,title,content,imageURL)=>{
        if(id || title || content || imageURL){
            const post = await Post.findByPk(id);
            if(post){
                post.title = title;
                post.content = content;
                post.imageURL = imageURL;
                await post.save();
                return {status:202,post,success:true}
            }else{
                return {status:404, message:"Post not found", success:false}
            }
        }else{
            return {status:400, message:"Bad Request", success:false}
        }
    },
    deletePost : async (id)=>{
        if(id){
            const post = await Post.findByPk(id);
            if(post){
                await post.destroy();
                return {status:202,message:"Post deleted successfully",success:true}
            }else{
                return {status:404, message:"Post not found", success:false}
            }
        }else{
            return {status:400, message:"Bad Request", success:false}
        }
    }
}

export default PostsService


