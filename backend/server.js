const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")

require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

app.get("/", (req,res)=>{
    res.send("API is running")
})

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is connected")

    app.listen(4000,()=>{
        console.log("Server running on port 4000")
    })
})

.catch((error)=>console.log(error))

