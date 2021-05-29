require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { logger, requestLogger } = require('../middlewares/logger');

const { NODE_ENV, DB_URI } = process.env;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());

if (NODE_ENV === 'production') {
  app.use(requestLogger);
}

// Generate your banner here:
// https://manytools.org/hacker-tools/ascii-banner/
// Font used: ANSI Shadow
logger.info(`

███╗   ██╗ ██████╗ ██████╗ ███████╗         ██╗███████╗                  
████╗  ██║██╔═══██╗██╔══██╗██╔════╝         ██║██╔════╝                  
██╔██╗ ██║██║   ██║██║  ██║█████╗           ██║███████╗                  
██║╚██╗██║██║   ██║██║  ██║██╔══╝      ██   ██║╚════██║                  
██║ ╚████║╚██████╔╝██████╔╝███████╗    ╚█████╔╝███████║                  
╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚════╝ ╚══════╝                  
                                                                         
███████╗██╗  ██╗██████╗ ██████╗ ███████╗███████╗███████╗                 
██╔════╝╚██╗██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝                 
█████╗   ╚███╔╝ ██████╔╝██████╔╝█████╗  ███████╗███████╗                 
██╔══╝   ██╔██╗ ██╔═══╝ ██╔══██╗██╔══╝  ╚════██║╚════██║                 
███████╗██╔╝ ██╗██║     ██║  ██║███████╗███████║███████║                 
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝                 
                                                                         
███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗  ██████╗  ██████╗ ███████╗███████╗
████╗ ████║██╔═══██╗████╗  ██║██╔════╝ ██╔═══██╗██╔═══██╗██╔════╝██╔════╝
██╔████╔██║██║   ██║██╔██╗ ██║██║  ███╗██║   ██║██║   ██║███████╗█████╗  
██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║██║   ██║██║   ██║╚════██║██╔══╝  
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝╚██████╔╝╚██████╔╝███████║███████╗
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
                                                                         
 `);

mongoose.set('useCreateIndex', true);

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: NODE_ENV !== 'production'
});

const db = mongoose.connection;

db.once('connected', () => {
  app.emit('ready');
  logger.info('Connected to the database');
});
db.on('disconnected', () => logger.info('Disconnected from the database'));
db.on('error', (error) => logger.info('Database error: ', error));

module.exports = app;
