import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";

// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();


app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:5173","http://localhost:4000","https://bagadiatravels.com","https://www.bagadiatravels.com","https://bagadia-travels.netlify.app","http://bagadiatravels.com","https://bagadia-travels-frontend.vercel.app","https://www.magicaljourney.co.in","https://magicaljourney.co.in","http://magicaljourney.co.in"],
    credentials: true
  })
);

dotenv.config({});

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use("/api/v1",router);


const connectDatabase = () => {
    mongoose
      .connect(process.env.DB_URL)
      .then((c) => {
        console.log(`Mongodb connected to ${c.connection.host}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
connectDatabase();


// app.use(express.static(path.join(__dirname, "/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "/dist/index.html"));
// });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
