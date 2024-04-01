import React, {useState, useEffect} from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import "./SetGroupPage.css";
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import GamePage from './GamePage';
import LoginPage from './LoginPage';


function SetGroupPage() {;
  const root = ReactDOM.createRoot(document.getElementById('root'));
    const [cookies, setCookie, removeCookie] = useCookies();
    const [groupCode, setgroupCode] = useState('');
    const [groupName, setGroupName] = useState('');
    const [setGroupformDisplay, setSetGroupformDisplay] = useState('block');
    const [createGroupformDisplay, setCreateGroupformDisplay] = useState('none');
    const setGroup = () => {
        let paramsToSend = new URLSearchParams();
        paramsToSend.append("groupcode", groupCode);
        axios.get(`http://localhost/setgroupid?` + paramsToSend.toString())
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
    const createGroup = () => {
      let paramsToSend = new URLSearchParams();
      paramsToSend.append("groupname", groupName);
      paramsToSend.append("groupcreator", cookies.userid);
      axios.get(`http://localhost/creategroupid?` + paramsToSend.toString())
      .then(res => {
        if (res.data['message'] == "group created") {
          root.render(
            <CookiesProvider>
            <GamePage />
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
    const changeToCreateGroup = () => {
      setSetGroupformDisplay("none");
      setCreateGroupformDisplay("block");
    }
    const changeToLoginGroup = () => {
      setSetGroupformDisplay("block");
      setCreateGroupformDisplay("none");
    }
    return (
      <div>
        <div className='login-form-div' style={{display:setGroupformDisplay}}>
            <span className='login-form-span'>کد گروه : </span>
            <br></br>
            <input className='login-form-input' type='text' value={groupCode} onChange={(e)=>{setgroupCode(e.target.value)}}></input>
            <br></br>
            <br></br>
            <button className='login-form-button' onClick={setGroup}>ورود به گروه</button>
            <button className='login-form-button' onClick={changeToCreateGroup} style={{backgroundColor:"#fce195"}}>ساخت گروه جدید</button>
        </div>
        <div className='login-form-div' style={{display:createGroupformDisplay}}>
            <span className='login-form-span'>نام گروه : </span>
            <br></br>
            <input className='login-form-input' type='text' value={groupName} onChange={(e)=>{setGroupName(e.target.value)}}></input>
            <br></br>
            <br></br>
            <button className='login-form-button' onClick={changeToLoginGroup} style={{backgroundColor:"#fce195"}}>ورود به گروه</button>
            <button className='login-form-button' onClick={createGroup}>ساخت گروه جدید</button>
        </div>
      </div>
    );
  }
  
  export default SetGroupPage;
  