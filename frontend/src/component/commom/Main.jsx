import React from "react";
import '../../styles/common/common.sass';
import '../../styles/common/main.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

class Main extends React.Component {
    render () {
        return (
            <main>
                <section className={"discover_book_world"}>
                    <div className={"wrapper"}>
                        <div className={"discover_description"}>
                            <Link class="btn_light">В каталог</Link>
                        </div>
                    </div>
                </section>
                <section>
                </section>
            </main>

        )
    }
}

export default Main;