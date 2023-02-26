import { useState } from "react";
import axios from 'axios';
const md5 = require('md5');


function callLoginStatus(setIsLogin) {
  axios.post('/login-status', setIsLogin)
    .then((response) => {
      setIsLogin(response.data.authorized);
    })
    .catch((error) => {
      console.log(error);
    });
}

function callLogin(user, password, setIsLogin) {
  axios.post('/login', { user, password: md5(password) })
    .then((response) => {
      setIsLogin(true)
    })
    .catch((error) => {
      console.log(error);
    });
}

function callLogout(setIsLogin) {
  axios.post('/logout', {})
    .then((response) => {
      setIsLogin(false)
    })
    .catch((error) => {
      console.log(error);
    });
}

function callSecrete(setProtectedContent) {
  axios.post('/secret', {})
    .then((response) => {
      setProtectedContent(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
}

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [protectedContent, setProtectedContent] = useState('');

  callLoginStatus(setIsLogin);

  return (
    <div style={{ padding: 20 }}>

      <p>
        {!isLogin ? 'You are not logged in 👎' : 'Yes, you are now logged in 👍'}
      </p>
      <p>
        <button onClick={() => callLogin('tina', 'tina123', setIsLogin)}>Login ...</button>
      </p>
      <p>
        <button onClick={() => callLogout(setIsLogin)}>Logout ...</button>
      </p>
      <p>
        <button onClick={() => callSecrete(setProtectedContent)}>Check a protected call ...</button>
        <span style={{ marginLeft: 10, marginRight: 10 }}>{'=>'}</span>{protectedContent}
      </p>

    </div>
  );
}

export default App;
