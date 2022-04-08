import {Route, Switch} from "react-router-dom";
import React from "react";
import UserList from "./UserList";
import UserProfile from "./UserProfile";

const User = () => (
    <Switch>
        <Route exact path={"/users/profile"} component={UserProfile}/>
        <Route exact path={"/users"} component={UserList}/>
        <Route exact path={"/users/:id"} component={UserProfile}/>
    </Switch>
)

export default User;