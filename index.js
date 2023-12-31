require('dotenv').config()
const http = require('http')
const app = require('./src/app')
const connectDB = require('./src/db/connectDB')
const applyMiddleware = require('./src/middleware/applyMiddleware')
const server = http.createServer(app)
const port = process.env.PORT || 5000
// applyMiddleware(app)

const main = async () => {
  await connectDB();
  server.listen(port, () => {
    console.log(`Gear-gather-server running with mongoose on port:- ${port}`);
  });
};

main()