import React from "react";
import '../../styles/common/common.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../commom/NavBar';

class Main extends React.Component {
    render () {
        return (
            <div className={"wrapper"}>
                <NavBar/>
            </div>
        )
    }
}

export default Main;