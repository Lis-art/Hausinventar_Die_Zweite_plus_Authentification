import "./InventoryCard.css"
import { NavLink } from "react-router-dom";



const InventoryCard = ({id, title, room, imageUrl, description, onDelete}) => {
        
    return (
        <article>
            <div>
                <img src={imageUrl} alt={title} />
            </div>
            <div>
                <h2>{title}</h2>
                <h3>{room}</h3>
                <h4>Beschreibung</h4>
                <p>{description}</p>
                <NavLink to={`/detailPage/${id}`}>EDIT</NavLink>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>
        </article>
    )
}

export default InventoryCard;