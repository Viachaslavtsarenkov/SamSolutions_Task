import React, {useState} from "react";
import Main from "./component/commom/Main";
import LogIn from "./component/auth/LogIn";
import SignUp from'./component/auth/SignUp'
import NavBar from'./component/commom/NavBar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Activation from "./component/auth/Activation";
import Author from "./component/authors/Author"

function App()  {

    function logOut() {
        localStorage.removeItem("user");
    }
    const [currentUser, setCurrentUser] = useState(0);

  return (
    <div className="App">
        <Router>
            <Switch>
                <div className="container">
                    <NavBar/>
                    <Route exact path={'/'} component={Main}>
                    </Route>
                    <Route exact path={"/login"} component={LogIn}>
                    </Route>
                    <Route exact path={"/registration"} component={SignUp}>
                    </Route>
                    <Route path={"/authors"} component={Author}>
                    </Route>
                    <Route exact path={"/activation"} component={Activation}>
                    </Route>
                </div>
            </Switch>
        </Router>
    </div>
  );
}
export default App;