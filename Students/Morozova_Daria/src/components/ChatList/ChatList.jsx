import './style.css';
import React, { Component, Fragment } from 'react';
import Chat from '../Chat/Chat.jsx';

import ChatsDialog from '../ChatsDialog/ChatsDialog.jsx';

export default class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [
                {
                    name: 'Ann',
                    messages: '21 messages',
                },
                {
                    name: 'Andrew',
                    messages: '90 messages',
                },
                {
                    name: 'Dylan',
                    messages: '75 messages',
                },
                {
                    name: 'Sarah',
                    messages: '54 messages',
                },
                {
                    name: 'Admin',
                    messages: '102 messages',
                },
            ],
            addFunc: this.addChat.bind(this),
        }
        
    }

    addChat = (name) => {
        this.setState({
            chats: [...this.state.chats, {
                    name: name,
                    messages: '0 messages',
                }
            ],
        });
        console.log('chat was added to the list');
    }

    componentDidUpdate() {
        this.render();
    }

    render() {
        
        let { chats } = this.state;
        let chatsArray = chats.map((chat, index) => {
            let { name, messages } = chat;
            return <Chat name = { name } messages = { messages } key = { index } id = { this.props.id + index} />
        });

        return (
            <Fragment>
                <div className="chatList d-flex flex-column">

                    { chatsArray }
                    <div>
                        <ChatsDialog addFunction={ this.state.addFunc } />
                    </div>
                </div>
            </Fragment>
        )
    }
}
    