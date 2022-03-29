import {Route, Switch} from "react-router-dom";
import React from "react";
import DiscountForm from "./DiscountForm";
import DiscountsList from "./DiscountsList";
import DiscountView from "./DiscountView";

const Discounts = () => (
    <Switch>
        <Route exact path={"/discounts"} component={DiscountsList}/>
        <Route path={"/discounts/new"} component={DiscountForm}/>
        <Route path={"/discounts/:id/edit"} component={DiscountForm}/>
        <Route path={"/discounts/:id"} component={DiscountView}/>
    </Switch>
)

export default Discounts;