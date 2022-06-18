require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const SESSION_SECRET = process.env.SESSION_SECRET


module.exports = {
  MONGODB_URI,
  SESSION_SECRET,
}