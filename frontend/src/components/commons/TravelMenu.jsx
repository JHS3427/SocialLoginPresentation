export function TravelMenu({name, type, handleClick}) {
    return(
        <button type="button" 
                className="travel-menu" 
                onClick={() => {handleClick(type)}} >{name}</button>
    );
}