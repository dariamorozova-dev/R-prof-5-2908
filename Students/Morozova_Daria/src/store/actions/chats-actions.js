export let ADD_CHAT = '@@chats/ADD_CHAT';
export let addChatToList = (name) => ({
    type: ADD_CHAT, name
})