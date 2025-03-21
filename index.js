import { configDotenv } from "dotenv"
import express from "express"
import Credentials from "./Config/credentials.js"
import cors from "cors"
import CorsOptions from "./Config/corsOptions.js"
import sequelize from "./DB/database.js"
import AuthRouter from "./Router/authRouter.js"
import PostRouter from "./Router/postsRouter.js"
import url from "url"
import path from "path"
import fs from "fs"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const dotenv = configDotenv()

app.use(Credentials)
app.use(cors(CorsOptions))

app.use(express.json({ limit: "10mb" }));  
app.use(express.urlencoded({ limit: "10mb", extended: true })); 


app.use("/api/auth", AuthRouter)
app.use("/api/posts", PostRouter)

app.get("/api/uploads/:image", (req, res) => {
	try {
	  const image = req.params.image;
	  const imagePath = path.join(__dirname, "uploads", image);

  
	  if (fs.existsSync(imagePath)) {
		res.sendFile(imagePath);
	  } else {
		res.status(404).send("Image not found");
	  }
	} catch (error) {
	  console.error("Error fetching the image:", error);
	  res.status(500).send("Server error");
	}
  });

const PORT = process.env.PORT || 6000

sequelize.sync().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));