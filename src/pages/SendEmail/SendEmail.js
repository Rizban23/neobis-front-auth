import { Link } from 'react-router-dom';
import Main from '../../components/Main/main';
import Bg from '../../components/Bg/Bg';
import './sendEmail.css';

function SendEmail(){
    return (
        <div className="wrapper">
            <Bg/>
            <div className="container fl-col-ai-cen ">
                <Main/>
                <h2 className='registr-title'>
                    Выслали письмо со ссылкой для завершения регистрации на example@gmail.com
                </h2>
                <p className='descr mt25px'>
                Если письмо не пришло, не спеши ждать совиную почту - лучше <span className='descr-bold'>проверь ящик “Спам” </span>
                </p>
                <div className='divider'>
                (´｡• ω •｡`)
                </div>
                <Link className='loginBtn mt25px' to={'/login'}>Войти</Link>
            </div>
        </div>
    )
}
export default SendEmail;