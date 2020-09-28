import './style.css';
import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import ChatsDialog from '../ChatsDialog/ChatsDialog.jsx';

import List from '@material-ui/core/List';
import Item from '../ChatListItem/ChatListItem.jsx';

import { addChatToList } from '../../store/actions/chats-actions';

// import Chat from '../Chat/Chat.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ChatList extends Component {
    add = (name) => {
        this.props.addChatToList(name);
    }
    

    // addChat = (name) => {
    //     this.setState({
    //         chats: [...this.props.chats, {
    //                 name: name,
    //                 messages: '0 messages',
    //             }
    //         ],
    //     });
    //     console.log('chat was added to the list');
        
    // }

    render() {
        let {chats} = this.props; 

        let linksArr = chats.map(ch =>  
            <Link to = {`/chat/${ch.id}/`} key = {ch.id}>
                <Item name={ch.title} />
            </Link>)

        return (
            <Fragment>
                <div className="ChatList d-flex flex-column">
                    <List>
                        { linksArr }
                    </List>
                    <div>
                        <ChatsDialog addFunction={ this.add }/>
                    </div>
                </div>
            </Fragment>
        )
    }
}
 
const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats
});

const mapDispatchToProps = dispatch => bindActionCreators({ addChatToList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);