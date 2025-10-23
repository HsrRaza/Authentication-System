import express from "express";

const app = express();


// middlewares 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// router  imports

import authRouter from "./routes/auth.routes.js"



app.use("/api/v1/user",authRouter )

export default app;