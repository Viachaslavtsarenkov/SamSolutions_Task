import React, {useEffect, useState} from "react";
import Main from "./component/commom/Main";
import LogIn from "./component/auth/LogIn";
import SignUp from'./component/auth/SignUp'
import NavBar from'./component/commom/NavBar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Activation from "./component/auth/Activation";
import Author from "./component/authors/Author"
import Book from "./component/books/Book"
import Footer from "./component/commom/Footer";
import Discounts from "./component/discounts/Discounts";
import Cart from "./component/cart/Cart";
import User from "./component/users/User";
import Orders from "./component/orders/Orders";
import UserProfile from "./component/users/UserProfile";
import UtilCart from "./service/UtilCart";
import NotFound from "./component/errors/NotFound";
import axios from "axios";

function App()  {

    let [cartCount, setCartCount] = useState(UtilCart.getCountFromCart());
    useEffect(() => {
    }, [cartCount])

    function updateCartCount() {
        setCartCount(UtilCart.getCountFromCart())
    }
  return (
    <div className="App">
        <Router>
            <Switch>
                <div className={"loc"}>
                    <NavBar count = {cartCount}/>
                    <Route exact path={'/'} component={Main}/>
                    <Route exact path={"/login"} component={LogIn}/>
                    <Route exact path={"/registration"} component={SignUp}/>
                    <Route path={"/authors"} component={Author}/>
                    <Route exact path={"/activation"} component={Activation}/>
                    <Route path={"/books"} render={(props) =>
                        <Book {...props} cart={updateCartCount} />}/>
                    <Route path={"/discounts"} component={Discounts}/>
                    <Route path={"/cart"} render={(props) =>
                        <Cart {...props} cart={updateCartCount} />} />
                    <Route path={"/users"} component={User}/>
                    <Route path={"/orders"} component={Orders}/>
                    <Route exact path={"/profile"} component={UserProfile}/>
                    <Route path={"/404"} component={NotFound} />
                    <Footer/>
                </div>
            </Switch>
        </Router>
    </div>
  );
}
export default App;
