import "./ProfileCard.css";
/* import { NavLink } from "react-router-dom"; */

const ProfileCard = ({ id, email, name, description, imageUrl, onDelete }) => {
  return (
    <article>
      <div>
        <img src={imageUrl} alt={name} />
      </div>
      <div>
        <h2>{name}</h2>
        <h3>{email}</h3>
        <h4>Über mich:</h4>
        <p>{description}</p>
        {/*  <NavLink to={`/detailPage/${id}`}>EDIT</NavLink> */}
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </article>
  );
};

export default ProfileCard;
