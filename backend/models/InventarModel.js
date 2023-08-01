import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    title: String,
    room: String,
    image: {
        type: {
            url: String,
            imageId: String
        }
    },
    description: String,
    category: {
        type: String,
        enum: ["big", "medium", "small"]
    } 
})

export const Inventory = mongoose.model("Inventory", inventorySchema)