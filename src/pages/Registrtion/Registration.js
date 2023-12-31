
import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Sign,  } from '../../Sign in/Signpage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from '../../components/Main/main';
import Bg from '../../components/Bg/Bg'; 
import {register} from '../../api/api'
import eyeIcon from '../../assets/eyeIcon.svg';
import eyeIconVisib from '../../assets/eyeIconVisib.svg'
import './Registration.css';

function Registration() {
    const emailRef = useRef();
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [isMaxMinLength, setIsMaxMinLength] = useState('');
    const [isLetter, setIsLetter] = useState(false);
    const [isNumber, setIsNumber] = useState(false);
    const [isSpecialSymbol, setIsSpecialSymbol] = useState();
    const [requestError, setRequestError] = useState(false);
    let navigate = useNavigate();

    const onSubmit = async () => {
        console.log(userInfo)
        const data = {
            email:userInfo.email,
            username:userInfo.username,
            password1:userInfo.password,
            password2:userInfo.confirmPassword 
        }
        try{
            const response = await register(data)
            console.log(response)
            navigate('/registercompleted');
        }
        catch(err){
            setRequestError(true)
            if(+err.response?.data.status === 400){
                toast.error(err.response.data.message)
            } else if(err?.response){
                toast.error('Произошла ошибка')
            } else if(err?.message){
                toast.error('Сервер не отвечает')
            }
        }
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        },
        validationSchema: Sign,
        onSubmit,
    });

    const userInfo = values

    const togglePasswordVisibility = (e) => {
        if(e.target.id === 'eye1'){
            setPasswordVisible1(!passwordVisible1);
        } else if(e.target.id === 'eye2'){
            setPasswordVisible2(!passwordVisible2);
        }
    };

    useEffect(()=>{
        setIsMaxMinLength(values.password.length >= 8 && values.password.length <= 15)
        setIsLetter(values.password.match(/[A-Z]/) && values.password.match(/[a-z]/))
        setIsNumber(values.password.match(/[0-9]/));
        setIsSpecialSymbol(values.password.match(/[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/))
    }, [values.password])

    useEffect(() =>{
        emailRef.current.focus();
    }, []);

  return (
    <div className='wrapper'>
    {
        requestError &&
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
    <Bg/>
    <div className="container">
        <Main/>
        <h2 className='registr-title'>Создать аккаунт Lorby</h2>
        <form onSubmit={handleSubmit}>
            <input
                value={values.email}
                onChange={handleChange}
                id="email"
                type="email"
                ref={emailRef}
                placeholder="Введи адрес почты"
                onBlur={handleBlur}
                className='loginInput' 
                required
            />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}

            <input 
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="username"
                className='passwordInput' 
                placeholder='Придумай логин'
                required
            />
            {errors.username && touched.username && (<p className="error">{errors.username}</p>)}

            <div className='input-wrapper'>
                <input 
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                type={passwordVisible1 ? 'text' : 'password'} 
                className='passwordInput' 
                placeholder='Создай пароль' />
                <img onClick={togglePasswordVisibility} 
                className="passwordIcon" 
                id='eye1' 
                src={passwordVisible1 ? eyeIconVisib : eyeIcon} alt="" 
                required
                />
            </div>  
            <>
                {
                !touched.password ?
                    (
                    <ul> 
                        <li className='msg'>
                            От 8 до 15 символов 
                        </li>
                        <li className='msg'>
                            Строчные и прописные буквы
                        </li>
                        <li className='msg'>
                            Минимум 1 цифра
                        </li>
                        <li className='msg'>
                            Минимум 1 спецсимвол (!, ", #, $...)
                        </li> 
                    </ul> 
                    ) : (
                    <ul> 
                        <li className={isMaxMinLength ? 'green' : 'red'}>
                            От 8 до 15 символов 

                        </li>
                        <li className={isLetter ? 'green': 'red'} >
                            Строчные и прописные буквы
                           
                        </li>
                        <li className={isNumber ? 'green' :'red'}>
                            Минимум 1 цифра
                           
                        </li>
                        <li className={isSpecialSymbol ? 'green' : 'red'}>
                            Минимум 1 спецсимвол (!, ", #, $...)
                        </li>
                    </ul> 
                    )
                }
            </>          
            <div className='input-wrapper'>
                <input 
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type={passwordVisible2 ? 'text' : 'password'} 
                className='passwordInput' 
                id="confirmPassword"
                placeholder='Повтори пароль'
                required
                />
                <img onClick={togglePasswordVisibility} className="passwordIcon" id='eye2' 
                src={passwordVisible2 ? eyeIconVisib : eyeIcon} alt="" />
            </div>
            {errors.confirmPassword && touched.confirmPassword && (<p className="error">{errors.confirmPassword}</p>)}
            <button disabled={isSubmitting} type='submit' className='loginBtn registr-btn'>Далее</button>
        </form>
    </div>
    </div>

  );
}

export default Registration