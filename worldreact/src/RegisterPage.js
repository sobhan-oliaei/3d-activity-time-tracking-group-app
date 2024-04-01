import React, {useState, useEffect} from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import "./RegisterPage.css";
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import GamePage from './GamePage';
import LoginPage from './LoginPage';

/**
* A component for login to the game
*/
function RegisterPage() {
    // change your server address here too
    let serverAdrs = `http://localhost`;
  const root = ReactDOM.createRoot(document.getElementById('root'));
    const [cookies, setCookie, removeCookie] = useCookies();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const validateEmail = (email2) => {
      return String(email2)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const check_phone = (number) => {
      let regex = new RegExp("^(\\+98|0)?9\\d{9}$");
      let result = regex.test(number);
      return result;
    };

    const CheckPassword = (inputtxt)  => { 
      let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if(inputtxt.match(passw)) { 
        return true;
      }
      else { 
        alert('رمز باید بین 6 تا 20 کاراکتر و حاوی حداقل یک عدد و یک حرف کوچک و بزرگ باشد...!')
        return false;
      }
    }

    /**
    * A function for sending register form data to server
    */
    const RegisterForm = () => {
      if (password == password2) {
        if (validateEmail(email)) {
          if (check_phone(phoneNumber)) {
            if (CheckPassword(password)) {
              let paramsToSend = new URLSearchParams();
              paramsToSend.append("username", userName);
              paramsToSend.append("password", password);
              paramsToSend.append("number", phoneNumber);
              paramsToSend.append("email", email);
              axios.get(serverAdrs + `/register?` + paramsToSend.toString())
              .then(res => {
                if (res.data == "user registered") {
                  root.render(
                    <CookiesProvider>
                    <LoginPage />
                  </CookiesProvider>
                  );
                }
                else {
                  alert("اطلاعات وارد شده صحیح نیست");
                }
              }).catch(ee => {
                alert("ارتباط با سرور برقرار نشد");
              });
            }
          }
          else {
            alert("شماره موبایل نامعتبر است");
          }
        }
        else {
          alert("ایمیل نامعتبر است");
        }
      }
      else {
        alert("رمز عبور و تکرار آن یکسان نیست");
      }
    }
    return (
      <div>
        <div className='login-form-div'>
            <span className='login-form-span'>نام کاربری : </span>
            <br></br>
            <input className='login-form-input' type='text' value={userName} onChange={(e)=>{setUserName(e.target.value)}}></input>
            <br></br>
            <br></br>
            <span className='login-form-span'>رمز عبور : </span>
            <br></br>
            <input className='login-form-input' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <br></br>
            <br></br>
            <span className='login-form-span'>تکرار رمز عبور : </span>
            <br></br>
            <input className='login-form-input' type='password' value={password2} onChange={(e)=>{setPassword2(e.target.value)}}></input>
            <br></br>
            <br></br>
            <span className='login-form-span'>شماره موبایل : </span>
            <br></br>
            <input className='login-form-input' type='text' value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}></input>
            <br></br>
            <br></br>
            <span className='login-form-span'>ایمیل : </span>
            <br></br>
            <input className='login-form-input' type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <br></br>
            <br></br>
            <button className='login-form-button' onClick={RegisterForm}>ثبت نام</button>
        </div>
      </div>
    );
  }
  
  export default RegisterPage;
  