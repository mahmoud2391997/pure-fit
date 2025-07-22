const jwt = require("jsonwebtoken");
require("dotenv").config();

// Access the secret key from the environment variables
const secretKey = process.env.SECRET_KEY;

const checkTokenValidation = async (req, res, next) => {
 const token = req.body.token;
  const isTokenExpired = (token) => {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const decodedToken = jwt.decode(token);
    const currentTime = Date.now() / 1000;
    console.log(decodedToken.exp);
    console.log(currentTime);

    return decodedToken.exp < currentTime;
  };

  // Example usage

 jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        // Token is invalid
    return res.status(401).json({ message: "Invalid token" });
      } else {
        // Token is valid
     const expired = isTokenExpired(token);

  if (expired) {
    return res.status(401).json({ message: "token is expired" });
  } else {
    // Token is still valid
return res.json({ message: "token is valid"});
    
       
      

  }
      }
    });
  };

module.exports = {checkTokenValidation};
