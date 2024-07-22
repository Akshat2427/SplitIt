import React , {useContext} from 'react';
import CardService from '../components/CardService';
import './Services.css';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
function Services() {
    const data = useContext(FirebaseContext);
    return (
        <div className="services-container" id='services' style={{display:"flex" , justifyContent:"space-around" ,  flexWrap:"wrap" , marginTop:"25px" , marginBottom:"20px"}}>
        <div className="card-service">
<Link to={"/split-expense-full"} style={{textDecoration:"none"}}>             <CardService  content={"Splitting expenses is a practical and efficient way for individuals, groups, or organizations to manage and share financial responsibilities. It involves dividing the cost of shared expenses, such as bills, groceries, travel expenses, or event costs, among multiple parties based on agreed-upon terms."} title={"Split Expenses"} img={"group-4.jpg"}  />
</Link>
        </div>
       <Link to={"/comming-soon"} style={{textDecoration:"none"}}>
       <div className="card-service">
            <CardService  title={"Coming Soon"} img={"c-soon-2.jpg"} /> 
        </div>
        </Link>
        <Link to={"/comming-soon"} style={{textDecoration:"none"}}>
        <div className="card-service">
            <CardService  title={"Coming Soon"} img={"c-soon-2.jpg"}/>
        </div> 
        </Link>  
        <Link to={"/comming-soon"} style={{textDecoration:"none"}}>

        <div className="card-service">
            <CardService  title={"Coming Soon"} img={"c-soon-2.jpg"} /> 
        </div>
        </Link>  
        </div>
    );
}

export default Services;