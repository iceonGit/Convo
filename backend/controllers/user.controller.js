import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.uid;

        let user = await User.findById(loggedInUserId);

        if (!user) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        const users = user.contacts;

        const filteredUsers = await User.find({
            username: { $in: users },
        }).select('username profilePic');

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log('Error in getUsersForSidebar: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getRequests = async (req, res) => {
    try {
        const loggedInUserId = req.uid;

        let user = await User.findById(loggedInUserId);

        if (!user) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        res.status(200).json(user.requests);
    } catch (error) {
        console.log('Error in getRequests: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const sendContactRequest = async (req, res) => {
    try {
        const loggedInUsername = req.username;
        const { username: receiverUsername } = req.params;

        let sender = await User.findOne({ username: loggedInUsername });
        let receiver = await User.findOne({ username: receiverUsername });

        if (!sender) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        if (!receiver) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        if (loggedInUsername === receiverUsername) {
            return res.status(400).json({
                error: 'Cannot send a request to yourself!',
            });
        }

        if (
            receiver.contacts.includes(loggedInUsername) ||
            sender.contacts.includes(receiverUsername)
        ) {
            return res.status(400).json({
                error: 'User is already in your contacts',
            });
        }

        if (receiver.requests.includes(loggedInUsername)) {
            return res.status(400).json({
                error: 'Request already sent',
            });
        }

        if (sender.requests.includes(receiverUsername)) {
            return res.status(400).json({
                error: 'Pending request from that user',
            });
        }

        receiver.requests.push(loggedInUsername);
        await receiver.save();

        res.status(201).json(loggedInUsername);
    } catch (error) {
        console.log('Error in sendContactRequest: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const acceptRequest = async (req, res) => {
    try {
        const loggedInUserId = req.uid;
        const { username: receiverUsername } = req.params;

        let user = await User.findById(loggedInUserId);
        let sender = await User.findOne({ username: receiverUsername });

        if (!user) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        if (!sender) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        if (!user.requests.includes(receiverUsername)) {
            return res.status(400).json({
                error: 'Request does not exist',
            });
        }

        if (
            sender.contacts.includes(loggedInUserId) ||
            user.contacts.includes(receiverUsername)
        ) {
            return res.status(400).json({
                error: 'User is already in your contacts',
            });
        }

        await user.requests.pull(receiverUsername);

        user.contacts.push(receiverUsername);
        sender.contacts.push(req.username);
        await Promise.all([user.save(), sender.save()]);
        res.status(201).json(user.contacts);
    } catch (error) {
        console.log('Error in acceptRequest: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const rejectRequest = async (req, res) => {
    try {
        const loggedInUserId = req.uid;
        const { username: receiverUsername } = req.params;

        let user = await User.findById(loggedInUserId);
        let sender = await User.findOne({ username: receiverUsername });

        if (!sender) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        if (!user) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        if (!user.requests.includes(receiverUsername)) {
            return res.status(400).json({
                error: 'Request does not exist',
            });
        }

        await user.requests.pull(receiverUsername);
        await user.save();
        res.status(201).json(user.contacts);
    } catch (error) {
        console.log('Error in rejectRequest: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
