import {Route, Switch} from "react-router-dom";
import AuthorsList from "../authors/AuthorsList";
import AuthorForm from "../authors/AuthorForm";
import AuthorView from "../authors/AuthorView";
import React from "react";

const Book = () => (
    <Switch>
        <Route exact path={"/books"} component={AuthorsList}>
        </Route>
        <Route path={"/books/new"} component={AuthorForm}>
        </Route>
        <Route path={"/books/:id"} component={AuthorView}>
        </Route>
        <Route path={"/books/:id/edit"} component={AuthorView}>
        </Route>
    </Switch>
)