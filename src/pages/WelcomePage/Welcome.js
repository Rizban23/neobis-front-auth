import './Welcome.css';
import React from 'react';
import balcony from '../../assets/balcony.jpg'
import {Link} from 'react-router-dom';

function Welcome() {
  return (
    <section className='container flex'>
        <h1 className='title'>Lorby</h1>
        <h3>Твой личный репетитор</h3>
        <img src={balcony}/>
        <Link className='loginBtn mt25px' to={'/login'}>Войти</Link>
        <Link to={'/register'} className='login-create white-btn'>У меня еще нет аккаунта</Link>
    </section>
  );
}

export default Welcome;