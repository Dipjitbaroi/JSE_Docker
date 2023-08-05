import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const user_token = authHeader.split(" ")[1];
        jwt.verify(user_token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).send("Forbidden");
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).send("Unauthorized");
    }
};

// export default checkToken;