import './bg.css'
import balcony from '../../assets/balcony.jpg';
function Bg (){
    return (
        <div className="background-wrapper">
            <img className="login-bg" src={balcony} />
            <h1 className='title main-title'>Lorby</h1>
            <h2 className='subtitle main-subtitle'>Твой личный репетитор</h2>
        </div>
    )
}
export default Bg;