const config = require('../config').ui;
const express = require('express');

const app = express();

app.use('/', express.static('./ui/'));
startServer(app, config.port);
app.on('error', () => startServer(app, config.port));


function startServer(app, port) {
	app.listen(port, () => console.log(`UI-server started on ${port} port`));
}
