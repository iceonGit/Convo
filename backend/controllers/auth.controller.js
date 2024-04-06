import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import { generateJWT } from '../helpers/generateToken.js';

import * as dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, username, password, confirmPassword } =
            req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        if (username.length < 5) {
            return res.status(400).json({
                error: 'Invalid username',
            });
        }

        // Check if user already exists with that username
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                error: 'Username already exists. Please choose a different username',
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Assign default profile picture (initials)
        const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

        // Create user
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            profilePic,
        });

        if (newUser) {
            // Save user to DB
            await newUser.save();

            // Generate JWT
            const token = await generateJWT(newUser.id, newUser.username);

            res.status(201).json({
                uid: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                token,
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user in DB and check password
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ''
        );

        if (!user || !isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: 'Invalid username or password' });
        }

        //Generate JWT
        const token = await generateJWT(user.id, username);

        res.status(200).json({
            uid: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            profilePic: user.profilePic,
            requests: user.requests,
            contacts: user.contacts,
            token,
        });
    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const renewToken = async (req, res = response) => {
    const { uid, username } = req;

    // Generate JWT
    const token = await generateJWT(uid, username);
    res.json({
        ok: true,
        uid,
        username,
        token,
    });
};

export const changeProfilePic = async (req, res) => {
    const getPublicId = (imageURL) => imageURL.split('/').pop().split('.')[0];
    try {
        const username = req.username;
        const { photoUrl } = req.body;

        const user = await User.findOne({ username });
        const currentImg = user.profilePic;
        if (currentImg.includes('cloudinary')) {
            const publicId = getPublicId(currentImg);
            await cloudinary.uploader.destroy(`chat-app/${publicId}`);
        }

        user.profilePic = photoUrl;
        await user.save();

        res.status(200).json({
            photoUrl,
        });
    } catch (error) {
        console.log('Error in ChangeProfilePic controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
