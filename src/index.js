import express from "express"
import rootRouter from "./routers/rootRouter.js";

const app = express();
app.use(express.json())


const port = 3000
app.listen(port)

app.use("/api", rootRouter)
