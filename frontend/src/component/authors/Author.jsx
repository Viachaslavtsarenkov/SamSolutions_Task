import {Route, Switch} from "react-router-dom";
import AuthorsList from "./AuthorsList";
import AuthorForm from "./AuthorForm";
import AuthorView from "./AuthorView";
import React from "react";

const Author = () => (
    <Switch>
        <Route exact path={"/authors"} component={AuthorsList}/>
        <Route path={"/authors/new"} component={AuthorForm}/>
        <Route path={"/authors/:id/edit"} component={AuthorForm}/>
        <Route path={"/authors/:id"} component={AuthorView}/>
    </Switch>
)

export default Author;