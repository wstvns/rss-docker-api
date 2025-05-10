require("dotenv").config();
const express   = require('express');
const path      = require('path'); 
const apiRoutes = require('./routes/routes.js');

// cria a instancia, como vimos no curso de postman
const app  = express();
const port = process.env.PORT

// pegando da public arquivos estaticos
app.use(express.static(path.join(__dirname, '../public')));

// app.use basicamente vai usar as rotas e mudando para /api.
app.use('/api', apiRoutes);

// Listening PORT "3000"
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});