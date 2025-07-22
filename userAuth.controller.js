const Profile = require("./user.model");
const Calendar = require("./calendar.model");
const Favorites = require("./favorites.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const crypto = require("crypto");

// AES-256-CBC algorithm requires a 32-byte key and a 16-byte IV
const algorithm = "aes-256-cbc";

// Generate a random 4-digit verification code
function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit number
}

const key = crypto.randomBytes(32); // 32 bytes = 256 bits (AES-256)
const iv = crypto.randomBytes(16); // 16 bytes = 128 bits (AES block size)
// Encrypt the verification code
function encryptVerificationCode(code, key, iv) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(code, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decrypt the encrypted verification code
function decryptVerificationCode(encryptedCode, key, iv) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedCode, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Step 1: Generate a 4-digit verification code

const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "mahmoudmelsaid1@gmail.com",
    pass: "weiy uoqh zpln zeld",
  },
});

const sendVerificationCodeEmail = (email, code) => {
  transporter.sendMail({
    from: "Pure-Fit<mahmoudmelsaid1@gmail.com>",
    to: email,
    subject: "Reset Password Verification Code",
    text: `Your verification code is: ${code}`,
  });
};


const secretKey = process.env.SECRET_KEY;
function getToken(email) {
  const user = {
    email: email,
    role: "user",
  };
  const token = jwt.sign({ user }, secretKey, { expiresIn: "168h" });
  console.log(token);
  return token;
}
async function hashPassword(password) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}
const createProfile = async (req, res) => {
  const profile = req.body;

  try {
   const existProfile = await Profile.findOne({ userEmail: profile.userEmail });
    if (existProfile) {
      res.status(409).json({message:"Email Already In Use"});
    } else {
     let newProfile =  await Profile.create({
        ...profile,
        password: await hashPassword(profile.password),
      });
      await  Calendar.create({
  profileId:newProfile._id,  // Pass the profile ID
  // Weeks and other data will be automatically filled with defaults
});
         await  Favorites.create({
  profileId:newProfile._id,  // Pass the profile ID
  // Weeks and other data will be automatically filled with defaults
});
      res.json({
        success: true,
        message: "Registeration successful",
        token: getToken(profile.userEmail),
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const checkAuthentication = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const emailCheck = await Profile.findOne({ userEmail: email });
    if (emailCheck) {
      console.log(emailCheck.password);
      console.log(password);

      if (await bcrypt.compare(password, emailCheck.password)) {
        res.json({
          success: true,
          message: "Authentication successful",
          token: getToken(email),
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const isCodeExpired = (expirationTime) => {
  const currentTime = Date.now();
  return currentTime > expirationTime;
};
const sendVerificationCode = async (req, res) => {
  console.log("reached");

  const email = req.body.email;
  let verificationCode = generateVerificationCode();
  const codeCreationTime = Date.now();
  const expirationTime = codeCreationTime + 10 * 60 * 1000;

  console.log("reached");
  sendVerificationCodeEmail(email, verificationCode);

  try {
    let profile = await Profile.updateOne(
      { userEmail: email },
      {
        $set: {
          verificationCode: encryptVerificationCode(verificationCode, key, iv),
          codeExpirationTime: expirationTime,
        },
      },
      { upsert: false }
    )
      .then((result) => {
        console.log("result");

        console.log(result); // Check the result
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    res.json("Verification Code Send");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const verifyCode = async (req, res) => {
  const email = req.body.email;
  const verificationCode = req.body.verificationCode;
  console.log(verificationCode)

  let profile = await Profile.findOne({ userEmail: email });
  console.log(profile)
      console.log(decryptVerificationCode(profile.verificationCode, key, iv))

  if (
    decryptVerificationCode(profile.verificationCode, key, iv) ===
    verificationCode
  ) {
    if (!isCodeExpired(profile.codeExpirationTime)) {
      res.json({ message: "The User Entered The Right Verification Code" });
    } else {
      res.status(500).json("Verification Code Expired");
    }
  } else {
    res.status(500).json("Incorrect Verification Code");
  }
};

const resetPassword = async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  let profile = await Profile.updateOne(
    { userEmail: email },
    {
      $set: {
        password: await hashPassword(newPassword),
      },
    },
    { upsert: false }
  );
  if (profile.acknowledged) {
    res.json("Password Changed Successfully");
  } else {
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  createProfile,
  checkAuthentication,
  sendVerificationCode,
  verifyCode,
  resetPassword,
};
