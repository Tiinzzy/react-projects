import { useState } from "react";

import LoginForm from "./components/login/LoginForm";
import BackEndConnection from './components/tools/BackEndConnection';
import UserPage from "./components/home_page/UserPage";
import SignUp from "./components/login/SignUp";

const backend = BackEndConnection.INSTANCE();
const CURENT_PATH = window.location.pathname;

function checkLoginStatus(setIsLogin, setUser, setPageReady) {
  backend.checkLoginStatus((result) => {
    if (CURENT_PATH === '/' && !result.authorized) {
      window.location = '/login';
    } else {
      setUser(result.user);
      setIsLogin(result.authorized);
      setPageReady(true);
    }
  })
}

function App() {
  const [pageReady, setPageReady] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  checkLoginStatus(setIsLogin, setUser, setPageReady);

  return (
    <div>
      {pageReady && <div>
        {(user !== null && isLogin) && <UserPage user={user} />}
        {(CURENT_PATH === '/login' && !isLogin) && <LoginForm />}
        {(CURENT_PATH === '/sing-up' && !isLogin && user !== null) && <SignUp />}
      </div>}
    </div>
  );
}

export default App;
