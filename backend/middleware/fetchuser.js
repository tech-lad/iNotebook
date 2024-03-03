const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagood$boy'

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);  // Verifying the User
        req.user = data.user;           // Getting all the data of the User except the password
        next();                         // Getting to the callback of the post router with '/getuser'
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;