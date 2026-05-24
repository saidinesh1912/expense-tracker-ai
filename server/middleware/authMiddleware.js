const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({

      message:
        "No token provided",

    });

  }

  try {

    // Remove Bearer
    const token =
      authHeader.startsWith(
        "Bearer "
      )

      ? authHeader.split(
          " "
        )[1]

      : authHeader;

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );

    req.userId =
      decoded.id;

    req.userEmail =
      decoded.email;

    next();

  }

  catch(error){

    console.log(
      "JWT ERROR:",
      error.message
    );

    return res.status(401).json({

      message:
        "Invalid token",

    });

  }

};

module.exports =
  authMiddleware;