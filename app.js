const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Tic-Tac-Toe app running on http://localhost:${port}`);
});