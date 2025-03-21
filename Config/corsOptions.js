import allowedOrigins from "./allowedOrigins.js";


const CorsOptions = {
    origin : allowedOrigins,
    allowedHeaders : ["Origin", "X-Requested-With", "Content-Type", "Accent", "Authorization",'frontend-url'],
    credentials : true,
}

export default CorsOptions