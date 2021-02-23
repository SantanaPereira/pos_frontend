import React, { Component } from "react";
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

// Verificar se está liged IN
const isLoggedIn = () => {
  return localStorage.getItem('TOKEN_KEY') !== null;
};

//Rota segura -- Secure Route
const SecuredRoute = ({ component: Component, ...rest }) => (                        
  <Route
    {...rest}
    render={props =>
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


export default class App extends Component {
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log("update");
  }

  render() {
    
    return (
      <Router>
       {/* Se estiver logado mostra o Header e o Sidebar*/}
       <Switch>
          <div>
            {isLoggedIn() && <Header />}
            {isLoggedIn() && <Sidebar />}
            <Route path="/register" component={Register} />
            <Route path ="/" exact component={Login} />
            <Route path ="/login/:notify?"  component={Login} />
            <Route path="/password/forgot" component={Passwordforgot} />
            <Route path="/password/reset/:token" component={Passwordreset} />
           
            {/*É aqui que colocamos a rota dashboard  que so aparece com um login seguro */}
            <SecuredRoute  path="/dashboard"  component={Dashboard} />
            <SecuredRoute  path="/profile" component={Profile} />
         
            {isLoggedIn() && <Footer />}
          </div>
           
          </Switch>
      
      </Router>
    );
  }
}


