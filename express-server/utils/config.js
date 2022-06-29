require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const SESSION_SECRET = process.env.SESSION_SECRET
const CHAIN_URL = process.env.CHAIN_URL


module.exports = {
  MONGODB_URI,
  SESSION_SECRET,
  CHAIN_URL
}