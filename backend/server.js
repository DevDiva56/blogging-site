const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")

require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
        "https://blogging-site-ncnbogl7s-lopuas-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
)

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

app.get("/", (req,res)=>{
    res.send("API is running")
})

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));


