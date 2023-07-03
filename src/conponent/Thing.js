const Thing = ({ isActive }) => {
    console.log(isActive)
    return ( 
        <div>
            <h4>{isActive}</h4>
        </div>
    );
}
 
export default Thing;