import './style.css';
import React, { Component, Fragment } from 'react';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from '../Message/Message.jsx';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import InputComp from '../CompInputTest/comp.jsx';



export default class MessageField extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.msgField = React.createRef();
    }

    static propTypes = {
        chatId: PropTypes.number.isRequired
    };

    state = {
        chats: {
            1: {title: 'Чат 1', messageList: [1]},
            2: {title: 'Чат 2', messageList: [2]},
            3: {title: 'Чат 3', messageList: [3]},
        },

        messages: {
            1: { text: 'Сообщение чата №1', sender: 'Darth Vader' },
            2: { text: 'Сообщение чата №2', sender: 'Darth Vader' },
            3: { text: "Сообщение чата №3", sender: 'Вася Петечкин' },
        },
        
        input: '',
    };

    handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleKeyUp = (event, message) => {
        if (event.keyCode === 13) { // Отправка сообщений по клавише Enter
            this.sendMessage(this.state.input, 'Me')
        }
    };

    // Ставим фокус на <input> при монтировании компонента
    componentDidMount() {
        this.textInput.current.focus();
    }

    sendMessage = (message, sender) => {
        const { messages, chats, input } = this.state;
        const { chatId } = this.props;
 
        if (input.length > 0 || sender === 'Bot') {
            const messageId = Object.keys(messages).length + 1;
            this.setState({
                messages: {...messages, [messageId]: {text: message, sender: sender}}, 
                chats: {...chats, [chatId]: { ...chats[chatId], messageList: [...chats[chatId]['messageList'], messageId]}},
            })
        }
        if (sender === 'Me') {
            this.setState({ input: '' })
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { messages } = this.state;
        if (Object.keys(prevState.messages).length < Object.keys(messages).length &&
            Object.values(messages)[Object.values(messages).length - 1].sender === 'Me' && 
            Object.values(messages)[Object.values(messages).length - 2].sender !== 'Me') {
            setTimeout(() =>
                this.sendMessage('Не приставай ко мне, я робот!', 'Bot'), 1000);
        }
        this.textInput.current.focus();
        this.msgField.current.scrollTop = this.msgField.current.scrollHeight;
    }
    
    render() {
        const { messages, chats } = this.state;
        const { chatId } = this.props;

        let contentArray = chats[chatId].messageList.map((messageId, index) => (
            <Message
                key={ index }
                text={ messages[messageId].text }
                sender={ messages[messageId].sender }
            />));

        return (
            <div className="layout-msg-field col-9" key='contentArray'>
                <div className="message-field" ref={ this.msgField }>
                    { contentArray }
                    <div className="controls d-flex pt-3 align-items-center align-self-end" key='textInput'>
                        <TextField
                            id="input"
                            ref={ this.textInput }
                            fullWidth={ true }
                            name="input"
                            hintText="Message"
                            type="text"
                            value={ this.state.input }
                            onChange={ this.handleChange}
                            onKeyUp={ (event) => this.handleKeyUp(event, messages) }
                        />
                        <FloatingActionButton
                            mini={true} style={{ boxShadow: 'none' }}
                            onClick={ () => this.sendMessage(this.state.input, 'Me') } >
                            <SendIcon />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        )

    }
}