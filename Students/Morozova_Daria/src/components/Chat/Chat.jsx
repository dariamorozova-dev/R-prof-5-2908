import './style.css';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default props => {
    let { name, messages, id } = props;
    let pathId = `/chat/${id}/`;

    return (
        <Fragment>
            <Link to = { pathId } >
                <div className="chat d-flex flex-column">
                <span className="chatName">{ name } </span>
                    <p className="chatMsgs">{ messages } </p>
                </div>
            </Link>
        </Fragment>
    )
}
    