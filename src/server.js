const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const logger = require('./common/winston');
const mongoose = require('mongoose');
mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', () => {
  logger.error('MongoDB connection error:');
}).once('open', () => {
  logger.info('Successfully connect to MongoDB');
  // db.dropDatabase();
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
