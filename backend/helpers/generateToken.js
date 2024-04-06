import jwt from 'jsonwebtoken';

export const generateJWT = (uid, username) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, username };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '365d',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Could not generate token');
                }
                resolve(token);
            }
        );
    });
};
