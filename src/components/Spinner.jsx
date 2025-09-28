import SpinnerGif from "../assets/Spinner.gif";
const Spinner   =()=>{
    return(
        <div className="d-flex justify-content-center align-items-center ">
            <img className="w-25" src={SpinnerGif} alt="loading"/>
        </div>
    )
}
export default Spinner;