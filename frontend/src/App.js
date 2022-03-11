import React, {useState} from "react";
import Main from "./component/commom/Main";
import LogIn from "./component/auth/LogIn";
import SignUp from'./component/auth/SignUp'
import NavBar from'./component/commom/NavBar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Activation from "./component/auth/Activation";
import Author from "./component/authors/Author"
import Book from "./component/books/Book"
import Footer from "./component/commom/Footer";
import Sales from "./component/sales/Sales";
import Cart from "./component/cart/Cart";

function App()  {

    function logOut() {
        localStorage.removeItem("user");
    }

  return (
    <div className="App">
        <Router>
            <Switch>
                <div className={"loc"}>
                    <NavBar/>
                    <Route exact path={'/'} component={Main}/>
                    <Route exact path={"/login"} component={LogIn}/>
                    <Route exact path={"/registration"} component={SignUp}/>
                    <Route path={"/authors"} component={Author}/>
                    <Route exact path={"/activation"} component={Activation}/>
                    <Route path={"/books"} component={Book}/>
                    <Route path={"/sales"} component={Sales}/>
                    <Route path={"/cart"} component={Cart}/>
                    <Footer/>
                </div>
            </Switch>
        </Router>
    </div>
  );
}
export default App;
