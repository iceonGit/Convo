import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { username } = req.params;
        const senderId = req.uid;

        const receiver = await User.findOne({ username });
        const receiverId = receiver._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // If there is no existing conversation between users, start a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Update conversation and msg DB at the same time
        await Promise.all([conversation.save(), newMessage.save()]);

        const senderUsername = req.username;

        const receiverSocketId = getReceiverSocketId(username);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit(
                'newMessage',
                newMessage,
                senderUsername
            );
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log('Error in sendMessage controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { username } = req.params;
        const senderId = req.uid;

        const receiver = await User.findOne({ username });
        const chatId = receiver._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatId] },
        }).populate('messages'); // Populate method returns the actual message object, and not just the ID

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log('Error in getMessages controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
