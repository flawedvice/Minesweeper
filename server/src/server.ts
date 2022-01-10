const express = require('express');
const app = express()

const PORT = 8080;

const base = '~/dev/projects/Minesweeper'

app.use('/', express.static(base+'/client/dist/client'));

app.listen(PORT, console.log(`Listening on port ${PORT}`));