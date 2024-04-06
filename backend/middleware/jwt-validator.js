import express from 'express';
import jwt from 'jsonwebtoken';

export const JWTvalidator = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token in petition',
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = payload.uid;
        req.username = payload.username;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token',
        });
    }

    next();
};
