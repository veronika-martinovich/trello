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

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  logger.info(
    `${req.method} ${req.protocol}://${req.hostname}:${req.socket.localPort +
      req.originalUrl} queryParams:${JSON.stringify(
      req.query
    )} body:${JSON.stringify(req.body)}`
  );
  next();
});

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

app.use(middlewareErrorHandler);

module.exports = app;
