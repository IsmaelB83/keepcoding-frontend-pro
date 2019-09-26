// Imports
const express = require('express');
// Definitions
const PORT = process.env.PORT || 3000;
const app = express();

// Servir estaticos (para los ficheros JS/CSS que importa nuestro código)
app.use(express.static('.'));
// Redirigir todo el tráfico al index
app.get('/*', (req, res) => res.redirect('/'));
app.listen(PORT, () => {
  console.log(`Listening PORT: ${PORT}`);
});
