import "./AddFormular.css";
import axios from "axios";
import { useState } from "react";

const addItem = ({category, setRefresh}) => {
    
    const [adding, setAdding] = useState(false)


    const createItem = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        formData.set("category", category)
        console.log(formData);

        const response = await axios.post("/api/inventar/image", formData)
        setRefresh(prev => !prev)
        console.log(response);

        e.target.reset()
    }
    
    
    return ( 
        <div>
            <button onClick={() => setAdding(prev => !prev)}>Add Item</button>
            
            <form onSubmit={createItem} style={adding ? {display: "block"} : {display: "none"}}>
                <div>
                    <input type="text" name="title" id="title"/>
                    <label htmlFor="title">Title</label>
                </div>
                <div>
                    <input type="text" name="room" id="room"/>
                    <label htmlFor="room">Room</label>
                </div>
                <div>
                    <input type="text" name="description" id="description"/>
                    <label htmlFor="description">Description</label>
                </div>
                <div>
                    <input type="file" name="image" id="image"/>
                    <label htmlFor="title">Image</label>
                </div>
                <button type="submit">Publish</button>

            </form>
        </div>
    );
}
 
export default addItem;