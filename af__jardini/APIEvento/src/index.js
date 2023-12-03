const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors');
require('dotenv').config();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECT_URL);

const port = 3003;

// Rotas
const eventRoutes = require('./routes/eventRoutes');
const placeRoutes = require('./routes/placeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const hotelRoutes = require('./routes/hoteisRoutes');
const passagensRoutes = require('./routes/passagensRoutes.js');



//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/events', eventRoutes);
app.use('/places', placeRoutes);
app.use('/tickets', ticketRoutes);
app.use('/hoteis', hotelRoutes);
app.use('/passagens', passagensRoutes);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
