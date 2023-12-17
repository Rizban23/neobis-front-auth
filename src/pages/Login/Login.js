import {useRef, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {selectUsername} from '../../redux/loginSlice'
import {loginUser} from '../../redux/loginSlice'
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../../api/api';
import balcony from '../../assets/balcony.jpg';
import eyeIcon from '../../assets/eyeIcon.svg';
import eyeIconVisib from '../../assets/eyeIconVisib.svg';
import Bg from '../../components/Bg/Bg';
import './Login.css'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Login() {   
    let navigate = useNavigate(); 
    const userRef = useRef();
    const errRef = useRef();
    const dispatch = useDispatch();
    const login = useSelector(selectUsername);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
     console.log(login)
    useEffect(() =>{
        userRef.current.focus();
    }, []);

    useEffect(() =>{
        setError(false);
    }, [user, pwd]);    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(user, pwd);
        try{
            const data ={
                email:user,
                password:pwd
            }
          dispatch (loginUser(user));
          navigate ('/home');
            const response = await login(data)
           
            
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            // setAuth({user, pwd, roles, accessToken})
            setUser('');
            setPwd('');
            setSuccess(true);
        }catch(err){
            setError(true)
            if(!err?.response){
                toast.error('No server response')
            }else if(err.response?.status === 400){
                toast.error('Missing username or password');
            }else if (err.response?.status === 401){
                toast.error('Unauthorized')
            }else {
                toast.error('Неверный логин или пароль')
            }
            // errRef.current.focus();
        }
    }

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

  return (
    <>

        <div className="wrapper">
            <Bg />
            <div className="container">
                {
                error &&
                <ToastContainer  
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                }

                <img className="login-img mt25px" src={balcony} alt="" />
                <h2 className='subtitle'>Вэлком бэк!</h2>

                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    className='loginInput' 
                    id='username' 
                    ref={userRef} 
                    autoComplete='off' 
                    onChange={(e) => setUser(e.target.value)} 
                    value={user} 
                    placeholder='Введи туда-сюда логин' 
                    required/>
                    <div className='input-wrapper'>
                        <input 
                        type={passwordVisible ? 'text' : 'password'} 
                        id='password' className='passwordInput' 
                        onChange={(e) => setPwd(e.target.value)} 
                        value={pwd} 
                        placeholder='Пароль (тоже введи)' 
                        required/>
                        <img onClick={togglePasswordVisibility} 
                        className="passwordIcon" 
                        src={passwordVisible ? eyeIconVisib : eyeIcon} alt="eyeIcon" />
                    </div>
                    <button type='submit' className='loginBtn'>Войти</button>
                </form>
                <Link to={'/register'} className='login-create white-btn'>У меня еще нет аккаунта</Link>
            </div>
        </div>
    </>
  );
}

export default Login;