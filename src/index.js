require('dotenv').config();
const { logger } = require('../middlewares/logger');
const { v1 } = require('../routes');
const app = require('./app');

const { PORT } = process.env;

app.use('/api/v1', v1);

app.on('ready', () => {
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
});
