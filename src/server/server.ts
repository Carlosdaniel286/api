// src/index.ts
import express from 'express';
const router = require('../route/route')
import cookieParser from 'cookie-parser';
const app = express();
const port = 3001;
app.use(cookieParser());

app.use(express.json());
app.use('/',router)

app.get('/home', (req, res) => {
  res.send('Hello, TypScript with Express!');
});

app.listen(port, () => {
  console.log(port)
  console.log(`Server is runnin at http://localhost:${port}`);
});
 