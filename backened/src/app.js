import cors  from "cors"
import cookieParser from "cookie-parser";
import express from "express"

const app = express();

app.use(cors({
    origin:process.env.CORS,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb",extended:true}))


export {app};
