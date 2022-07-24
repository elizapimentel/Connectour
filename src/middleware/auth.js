const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

exports.checkAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).send('Header error')
    }

    try {
        jwt.verify(token, SECRET, (err) => {
            if(err) {
                return res.status(401).send('unauthorized')
            }
        });
        next()
    } catch (error) {
        console.error(error)        
    }
}