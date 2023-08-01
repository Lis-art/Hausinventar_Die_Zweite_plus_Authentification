import {useState, useEffect} from "react";
import Nav from "../components/nav/nav";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailCard from "../components/DetailCard/DetailCard";


const Detailpage = () => {
    
    const [refresh, setRefresh] = useState(true);
    const [inventoryItem, setInventoryItem] = useState([]);
    const params = useParams();

    useEffect (() => {
        const getInventoryItems = async () => {
            const response = await axios.get(`/api/inventar/${params.id}`)
            setInventoryItem(response.data)
        }
        getInventoryItems()
    }, [refresh])

    return ( 
        <>
        <header>
            <div>
                <Nav/>
            </div>
        </header>
        <main>
            <section>
            <DetailCard 
                    id={inventoryItem._id}
                    title={inventoryItem.title}
                    room={inventoryItem.room}
                    description={inventoryItem.description}
                    imageUrl={inventoryItem.image?.url}
                    setRefresh={setRefresh}
                />
            </section>
        </main>
        </>
     );
}
 
export default Detailpage;