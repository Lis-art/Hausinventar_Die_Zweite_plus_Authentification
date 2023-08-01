import "./CategoryPage.css";
import Nav from "../components/nav/nav"
import InventoryCard from "../components/InventoryCard/InventoryCard";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AddFormular from "../components/AddFormular/AddFormular"


const Categorypage = () => {
    
    const [refresh, setRefresh] = useState(true);
    const params = useParams();
    const [inventoryItem, setInventoryItem] = useState([]);
    const [addingItem, setAddingItem] = useState(false)

    
    useEffect (() => {
        const getInventoryItems = async () => {
            const response = await axios.get("/api/inventar")
            setInventoryItem(response.data)
        }
        getInventoryItems()
    }, [refresh])


    const deleteItem = async (itemId) => {
        try {
            const {data} = await axios.delete(`/api/inventar/delete/${itemId}`)
            setRefresh(prev => !prev)
        } catch (error) {
            console.log(error);
        }
  
    }

    const filterInventory = inventoryItem.filter((item) => 
        item.category === params.category
    )



    return ( 
        <>
        <header>
            <div>
                <Nav/>
            </div>
        </header>

        <main>
            <section>
                {filterInventory?.map((element) => 
                    <InventoryCard key={element._id} 
                    id={element._id}
                    title={element.title}
                    room={element.room}
                    description={element.description}
                    imageUrl={element.image.url}
                    onDelete={() => deleteItem(element._id)}
                    />
                )}
            </section>
            <section onClick={() => {setAddingItem(false)}}>
                <AddFormular addingItem={addingItem} setRefresh={setRefresh}
                setAddingItem={setAddingItem} category={params.category} />
            </section>
        </main>

        
        
        </>
    );
}
 
export default Categorypage;