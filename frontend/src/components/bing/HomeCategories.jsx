import "./HomeCategories.css"

const HomeCategoryCards = ({name, imgPath}) => {
    
    return ( 
        <div>
            <img src={imgPath} alt={name} />
            <h3>{name}</h3>
        </div>
     );
}
 
export default HomeCategoryCards;