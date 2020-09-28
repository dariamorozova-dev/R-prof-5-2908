import update from 'react-addons-update';
import { ADD_CHAT } from './../actions/chats-actions.js';

const storeMsg = {
    chats: [
        {
            id: '1',
            title: 'Lorem'
        },
        {
            id: '2',
            title: 'Ipsum'
        },
        {
            id: '3',
            title: 'Dolor'
        },
        {
            id: '4',
            title: 'Set Amet'
        },
    ]
}

export default (store = storeMsg, action) => {
    switch(action.type) {
        case ADD_CHAT:
            let lastChat = Object.keys(store.chats).length;
            let { name } = action;
            let newId = lastChat + 1;
            let newChat = { id: newId, title: name };
            return update(store, { chats: { $push: [ newChat ] } })

        default: 
            return store;
    }
}

// написать проп для отправки чата

// case SEND_MSG: {
//     let { text, sender } = action;
//     let newMsg = { text, sender };
//     return update(store, { messages: { $push: [newMsg] } })
// }
