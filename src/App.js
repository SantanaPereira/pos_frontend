import React from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import Register from "./components/register";
import Login from "./components/login"
import Passwordreset from "./components/passwordreset";
import Passwordforgot from "./components/passwordforgot";
//eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import * as loginActions from "./actions/login.action";
//eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";



const App =(props)=> {
 
  useSelector(({ loginReducer }) => loginReducer);

  //Rota segura -- Secure Route
    const SecuredRoute = ({ component: Component, ...rest }) => (                        
      <Route
        {...rest}
        render={props =>
          loginActions.isLoggedIn() === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );

    return (
      <Router>
       {/* Se estiver logado - isLoggedIn=true - mostra o Header e o Sidebar*/}
       <Switch>
          <div>
            {loginActions.isLoggedIn() && <Header />}
            {loginActions.isLoggedIn() && <Sidebar />}
            <Route path="/register" component={Register} />
            <Route path ="/" exact component={Login} />
            <Route path ="/login/:notify?"  component={Login} />
            <Route path="/password/forgot" component={Passwordforgot} />
            <Route path="/password/reset/:token" component={Passwordreset} />
           
            {/*É aqui que colocamos a rota dashboard  que so aparece com um login seguro */}
            <SecuredRoute  path="/dashboard"  component={Dashboard} />
            <SecuredRoute  path="/profile" component={Profile} />




         
            {loginActions.isLoggedIn()  && <Footer />}
          </div>
           
          </Switch>
      
      </Router>
    );
  
}

export default App;


