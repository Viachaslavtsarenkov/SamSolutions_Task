import React from "react";
import '../../styles/common/common.sass';
import '../../styles/common/main.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import main from  "../../icon/main.jpg";
import {Link} from "react-router-dom";

class Main extends React.Component {
    render () {
        return (
            <div className={"wrapper"}>
                <section className={"main_container"}>
                    <img className={"main_background"}
                        src={main}
                        width={456} height={563}/>
                    <div className={"main_description"}>
                        <h2 className={"main_title"}>
                            Pile of books is never too much
                        </h2>
                        <p className={"main_cite"}>
                            The main thing is not how much you spend by buying a book.
                            The main thing is how much you will lose by not reading it.
                        </p>
                        <Link to={"/books"} className={"shop_now_btn"}>
                         Shop now
                        </Link>
                    </div>
                </section>
            </div>
        )
    }
}

export default Main;