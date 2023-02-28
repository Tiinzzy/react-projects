import { useState } from "react";

import LoginForm from "./components/login/LoginForm";
import BackEndConnection from './components/tools/BackEndConnection';
import UserPage from "./components/home_page/UserPage";
import SignUp from "./components/login/SignUp";

const backend = BackEndConnection.INSTANCE();

function callLoginStatus(setIsLogin, setUser, setSignUp) {
  if (setSignUp) {
    setSignUp(true);
  }
  backend.checkLoginStatus((result) => {
    setUser(result.user);
    setIsLogin(result.authorized);
  })
}


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [signUp, setSignUp] = useState(false);


  callLoginStatus(setIsLogin, setUser);

  function callbacktoChangePage(e) {
    if (e.action === 'create-new-user') {
      callLoginStatus(setIsLogin, setUser, setSignUp);
    }
  }

  return (
    <div>
      {(isLogin && user !== null && signUp === false) && <UserPage user={user} />}
      {(!isLogin && signUp === false) && < LoginForm callbacktoChangePage={callbacktoChangePage} />}
      {(signUp === true && !isLogin && user !== null) && <SignUp />}
    </div>
  );
}

export default App;
