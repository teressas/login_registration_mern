const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({ 
    sender: { // id or name of sender
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: { // the message
        type: String,
        trim: true
    },
    chat: { // reference to chat that it belongs to
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Chat"
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageModel);

module.export = Message;