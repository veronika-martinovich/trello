const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const usersRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');
const middlewareErrorHandler = require('./helpers/errorHandlers')
  .middlewareErrorHandler;
const logger = require('./common/winston');
const httpLogger = require('./common/httpLogger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(httpLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', usersRouter);
app.use('/boards', boardsRouter);
boardsRouter.use('/:boardId/tasks', tasksRouter);
app.use((req, res, next) => {
  res.send(404);
  next();
});

app.use(middlewareErrorHandler);

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  const exit = process.exit;
  exit(1);
});

process.on('uncaughtException', (err, origin) => {
  logger.error(`Caught exception: ${err}, origin: ${origin}`);
  const exit = process.exit;
  exit(1);
});

module.exports = app;
