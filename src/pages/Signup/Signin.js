import React, {useState} from 'react';
import Modal from '../../components/Modal/Modal';
import balcony from '../../assets/balcony.jpg'
import './sign.css';
import { useSelector } from 'react-redux';

import {selectUsername} from '../../redux/loginSlice'
function Signin() {
  const [modal, setModal] = useState(false);
  const login = useSelector(selectUsername);
  return (
    <div className="wrapper">
      {modal && <Modal setModal={setModal} />}
      <div className='container flex justify'>
        <h2>С возвращением!</h2>
        <h3>{login} - твой личный репетитор</h3>
        <img className='welcomeImg' src={balcony} alt="" />
        <button className='white-btn btnExit mb25' onClick={() => setModal(true)}>Выйти</button>
      </div>
    </div>

  );
}

export default Signin;