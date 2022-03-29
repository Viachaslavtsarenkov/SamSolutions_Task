import React from "react";
import '../../styles/common/common.sass'

function Pagination(props) {
    return(
        <React.Fragment key={props.totalPages}>
            <div className="pagination">
                {+props.page !== 0 && (
                    <button
                        onClick={() => props.toPage(props.page - 1)}
                        className="page">
                        &larr;
                    </button>)}
                {[...Array(props.totalPages).keys()].map((el,index) => (
                    <div>
                        {(+index !== +props.page) && (
                            <button
                                onClick={() => props.toPage(el)}
                            >{el + 1} </button>
                        )}
                        {(index === +props.page) && (
                            <button className={"active_page"}
                                    onClick={() => props.toPage(el)}
                            >{el + 1} </button>
                        )}
                    </div>
                ))}
                {(+props.page + 1) !== props.totalPages && (
                    <button
                        onClick={() => props.toPage(props.page + 1)}
                        className="page">
                        &rarr;
                    </button>)}
            </div>
        </React.Fragment>

    )
}

export default Pagination;