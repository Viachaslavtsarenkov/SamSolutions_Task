import {Route, Switch} from "react-router-dom";
import AuthorsList from "../authors/AuthorsList";
import AuthorForm from "../authors/AuthorForm";
import AuthorView from "../authors/AuthorView";
import React from "react";
import OrderForm from "./OrderForm";
import OrdersList from "./OrdersList";
import OrderView from "./OrderView";
import Payment from "./Payment";

const Orders = () => (
    <Switch>
        <Route exact path={"/orders"} component={OrdersList}/>
        <Route path={"/orders/new"} component={OrderForm}/>
        <Route path={"/orders/payment"} component={Payment}/>
        <Route path={"/orders/:id"} component={OrderView}/>
    </Switch>
)

export default Orders