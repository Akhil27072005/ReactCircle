const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        console.log("No Token Found")
        return res.status(401).json({message:"Access Denied : No token found"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch(err){
        console.log("❗ Invalid Token:", err.message);
        return res.status(403).json({message:"Invalid Token"});
    }
};

module.exports = authenticateToken;



