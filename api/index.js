import express from 'express';

import { api } from '../config.js';
import user from '../network/response.js';

const app = express();

//ROUTERS
app.use('/api/user', user);

//SERVIDOR ACTIVO
app.listen(api.port, () => {
    console.log("Servidor cooriendo en el puerto: ", api.port);
});