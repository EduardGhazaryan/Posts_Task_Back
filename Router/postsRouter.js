import { Router } from "express";
import PostController from "../Controller/postsController.js";
import authMiddleware from "../Middlwares/authMiddlware.js";

const PostRouter = Router()

PostRouter.get("/", PostController.getPosts)

PostRouter.get("/:id", PostController.getPostById)

PostRouter.post("/", authMiddleware ,PostController.createPost)

PostRouter.put("/:id",authMiddleware, PostController.updatePost)

PostRouter.delete("/:id", authMiddleware, PostController.deletePost)


export default PostRouter