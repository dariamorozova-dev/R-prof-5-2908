import './style.css';
import React, { Component } from 'react';

import InputComp from '../Input/Input.jsx';
import FieldComp from '../MessageField/MessageField.jsx';
import PropTypes from 'prop-types';

export default class MainField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: {
                1: { title: 'Chat 1', messageList: [1]},
                2: { title: 'Chat 2', messageList: [2]},
                3: { title: 'Chat 3', messageList: []},
            },
            messages: {
                1: {sender: 'bot', text: 'Buonggiorno!'},
                2: {sender: 'bot', text: 'Buona sera, signiori!'},
            },
            // messages: [
            //     {
            //         sender: 'Vasya',
            //         text: 'Ciao!',
            //     },
            //     {
            //         sender: 'Petr',
            //         text: 'Hello!',
            //     },
            //     {
            //         sender: null,
            //         text: 'Privet!',
            //     },
            //     {
            //         sender: 'Ann',
            //         text: 'Guten tag!',
            //     }
            // ],
            sendFunc: this.sendMessage.bind(this),
        }
    }

    static propTypes = {
        chatId: PropTypes.number.isRequired,
    }

    sendMessage = (text, sender) => {
        const { chats, messages } = this.state;
        const { chatId } = this.props;

        if (sender === 'bot') {
            const messageId = Object.keys(messages).length + 1;
            this.setState({
                messages: {...messages,
                    [messageId]: {...chats[chatId],
                        messageList:[...chats[chatId]['messageLiist'], messageId]
                    }
                },
            })
        }

        if (sender === 'Anonim') {
            console.log(this.state);
        }

        // this.setState({
        //     messages: [...this.state.messages, 
        //         {
        //             sender: sender,
        //             text: text
        //         }
        //     ]
        // })
    }

    componentDidUpdate(prevProps, prevState) {
        const { messages } = this.state;
        if (Object.keys(prevState.messages).length < Object.keys(messages).length && Object.values(messages)[Object.values(messages).length-1].sender === 'Anonim') {
            setTimeout(() => 
                this.sendMessage('Mi lasci in pace!', 'bot'), 1000
            );
        }
        // setTimeout(() => {
        //     if (this.state.messages[this.state.messages.length-1].sender !== 'Bot') {
        //         this.setState({
        //             messages: [...this.state.messages, 
        //                 {
        //                     sender: 'Bot',
        //                     text: `${this.state.messages[this.state.messages.length-1].sender !== '' ? this.state.messages[this.state.messages.length-1].sender : 'Anonim'}, what do you want from me?`
        //                 }
        //             ]
        //         })
        //     }
        // }, 600)        
    }

    render() {        
        return (
            <div className="d-flex flex-column layout">
                <FieldComp messages = { this.state.messages } />
                <InputComp send = { this.sendMessage } />
            </div>     
        )
    }
}
