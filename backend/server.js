
import "./config/config.js"
import {v2 as cloudinary} from 'cloudinary';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import "./models/index.js";
import { Inventory } from "./models/InventarModel.js";
import {User} from "./models/UserModel.js";
import { userRouter } from "./routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
// AUT

//const test = dotenv.config({path:new URL ("../.env", import.meta.url).pathname})
//console.log(test);


/* await mongoose.connect(process.env.MONGO_URI);
app.use("/api", userRouter); */


const app = express();
const PORT = 3001;
const upload = multer({storage:multer.memoryStorage()});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

//AUT
app.use("/api", userRouter);
//app.use(express.static(ReactAppDistPath.pathname));
// für gleichzeitiges starten von back und frontend

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
}); 

app.get("/api/test", (req,res) => {
    res.send("läuft")
})

// alle Items bekommen
app.get("/api/inventar", async(req,res) => {
    const data = await Inventory.find();
    res.send(data);
})

// ein Item per ID bekommen
app.get("/api/inventar/:id", async (req,res) => {
    try{
        const dataId = await req.params.id; 
        const inventoryItem = await Inventory.findById(dataId);
        res.json(inventoryItem);
    } catch (error) {
        console.log(error);
        res.send("error vom inventoryItem GET")
    }
});



// ein Item adden
app.post("/api/inventar/image", upload.single("image"), async (req,res) => {
    console.log(req.file);
    try {
        cloudinary.uploader
            .upload_stream(
                {resource_type: "image", folder: "ImgInventar"},
                async (err, result) => {
                    console.log(result);
                    const response = await Inventory.create({
                        ...req.body,
                        image: {url: result.secure_url, imageId: result.public_id},
                    });
                    res.json(response);
                }
            ).end(req.file.buffer)
    } catch (err) {
        console.log(err);
        res.status(500).send("shit happens");
    }
}); 


// ein Item bearbeiten und Bild updaten
app.put("/api/updateItem/:id",upload.single("image"), async (req,res) => {
   console.log(req.body);
    try { 
    const id = req.params.id;

        if (req.file){
            cloudinary.uploader.upload_stream(
                {resource_type: "image", folder: "ImgInventar"},
                async (err, result) => {
                    const response = await Inventory.findByIdAndUpdate(id, {
                        ...req.body,
                        image: {url: result.secure_url, imageId: result.public_id},
                    });
                    cloudinary.uploader.destroy(response.image?.imageId, (err) => {
                        console.log(err, "error img update");
                    });
                    
                    res.json(response);
                }
            )
            .end(req.file.buffer)
        } else {
            const updateInventory = await Inventory.findByIdAndUpdate(id, req.body, {returnDocument:"after"})
            console.log(req.body,updateInventory);
            res.send(updateInventory);
        } 
    }catch (error) {
            console.error(error);
            res.sendStatus(500).send(error)
        }
});

// Item deleten
app.delete("/api/inventar/delete/:id", async (req,res) => {
    try{
        const dataId = await req.params.id; 
        const inventoryItem = await Inventory.findByIdAndDelete(dataId);
        cloudinary.uploader.destroy(dataId.image?.imageId, (err) => console.log(err));
        res.json(inventoryItem);
    } catch (error) {
        console.log(error);
        res.send("error vom inventoryItem DELETION")
    }
})

// ======================================================

//USER Routen

//get User
app.get("/api/user/:id", async (req,res) => {
    try{
        const userId = await req.params.id; 
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.send("error vom User GET")
    }
});

// post User
app.post("/api/user", upload.single("image"), async (req,res) => {
    console.log(req.file);
    try {
        cloudinary.uploader
            .upload_stream(
                {resource_type: "image", folder: "UserImages"},
                async (err, result) => {
                    console.log(result);
                    const response = await User.create({
                        ...req.body,
                        image: {url: result.secure_url, imageId: result.public_id},
                    });
                    res.json(response);
                }
            ).end(req.file.buffer)
    } catch (err) {
        console.log(err);
        res.status(500).send("User konnte nicht erstellt werden");
    }
}); 


// einen User bearbeiten und Bild updaten
app.put("/api/updateUser/:id",upload.single("image"), async (req,res) => {
    console.log(req.body);
     try { 
     const id = req.params.id;
 
         if (req.file){
             cloudinary.uploader.upload_stream(
                 {resource_type: "image", folder: "UserImages"},
                 async (err, result) => {
                     const response = await User.findByIdAndUpdate(id, {
                         ...req.body,
                         image: {url: result.secure_url, imageId: result.public_id},
                     });
                     cloudinary.uploader.destroy(response.image?.imageId, (err) => {
                         console.log(err, "error User img update");
                     });
                     
                     res.json(response);
                 }
             )
             .end(req.file.buffer)
         } else {
             const updateUser = await User.findByIdAndUpdate(id, req.body, {returnDocument:"after"})
             console.log(req.body,updateUser);
             res.send(updateUser);
         } 
     }catch (error) {
             console.error(error);
             res.sendStatus(500).send(error)
         }
 });
 
 // User deleten
 app.delete("/api/user/delete/:id", async (req,res) => {
     try{
         const userId = await req.params.id; 
         const user = await User.findByIdAndDelete(userId);
         cloudinary.uploader.destroy(userId.image?.imageId, (err) => console.log(err));
         res.json(user);
     } catch (error) {
         console.log(error);
         res.send("error vom User DELETION")
     }
 })


app.listen(PORT, () => console.log((`Der Server läuft auf Port: ${PORT}`)));