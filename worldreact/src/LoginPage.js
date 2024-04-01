import React, { useState, useEffect } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import "./LoginPage.css";
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import GamePage from './GamePage';
import RegisterPage from './RegisterPage';
import SetGroupPage from './SetGroupPage';

/**
* A component for login to the game
*/
function LoginPage() {
  // const checkGroup = () => {
  //   let paramsToSend = new URLSearchParams();
  //   paramsToSend.append("user", cookies.userid);
  //   axios.get(serverAdrs + `/checkisgroup?` + paramsToSend.toString())
  //   .then(res => {
  //     let data = res.data;
  //     if (data == "yes") {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }).catch(ee => {
  //     alert("ارتباط با سرور برقرار نشد");
  //     return false;
  //   });
  // }

  // change your server address here too
  let serverAdrs = `http://localhost`;
  useEffect(() => {
    if (cookies.userid) {
      if (cookies.userid != "none") {
        let paramsToSend = new URLSearchParams();
        paramsToSend.append("user", cookies.userid);
        axios.get(serverAdrs + `/checkisgroup?` + paramsToSend.toString())
          .then(res => {
            let data = res.data;
            if (data == "yes") {
              root.render(
                <CookiesProvider>
                  <GamePage />
                </CookiesProvider>
              );
            }
            else {
              root.render(
                <CookiesProvider>
                  <SetGroupPage />
                </CookiesProvider>
              );
            }
          }).catch(ee => {
            alert("ارتباط با سرور برقرار نشد");
          });
      }
    }
  }, []);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const loginFun = () => {
    let paramsToSend = new URLSearchParams();
    paramsToSend.append("user", userName);
    paramsToSend.append("pass", password);
    axios.get(serverAdrs + `/login?` + paramsToSend.toString())
      .then(res => {
        let data = res.data;
        if (data['message'] == "logged in") {
          setCookie('userid', data['user'], { maxAge: 108000000 });
          let paramsToSend = new URLSearchParams();
          paramsToSend.append("user", data['user']);
          axios.get(serverAdrs + `/checkisgroup?` + paramsToSend.toString())
            .then(res => {
              let data = res.data;
              if (data == "yes") {
                root.render(
                  <CookiesProvider>
                    <GamePage />
                  </CookiesProvider>
                );
              }
              else {
                root.render(
                  <CookiesProvider>
                    <SetGroupPage />
                  </CookiesProvider>
                );
              }
            }).catch(ee => {
              alert("ارتباط با سرور برقرار نشد");
            });
        }
        else {
          alert("اطلاعات وارد شده صحیح نیست");
        }
      }).catch(ee => {
        alert("ارتباط با سرور برقرار نشد");
      });
  }

  /**
  * A component for change the page to register page
  */
  const goToRegister = () => {
    root.render(
      <CookiesProvider>
        <RegisterPage />
      </CookiesProvider>
    );
  }
  return (
    <div>
      <div className='login-form-div'>
        <span className='login-form-span'>نام کاربری : </span>
        <br></br>
        <input className='login-form-input' type='text' value={userName} onChange={(e) => { setUserName(e.target.value) }}></input>
        <br></br>
        <br></br>
        <span className='login-form-span'>رمز عبور : </span>
        <br></br>
        <input className='login-form-input' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
        <br></br>
        <br></br>
        <span className='login-form-note-span'>با ورود به این وب اپلیکشن شما ذخیره کوکی بر روی مرورگر خود را قبول میکنید</span>
        <br></br>
        <br></br>
        <button className='login-form-button' onClick={loginFun}>ورود</button>
        <button className='login-form-button' onClick={goToRegister} style={{ backgroundColor: "#fce195" }}>ثبت نام</button>
      </div>
    </div>
  );
}

export default LoginPage;
