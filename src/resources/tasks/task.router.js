const tasksRouter = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');
const validateTask = require('./task.validation');
const asyncErrorHandler = require('../../helpers/errorHandlers')
  .asyncErrorHandler;

tasksRouter
  .route('/')
  .get(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const tasks = await tasksService.getAll(req.params.boardId);
      res.json(tasks);
    })
  )
  .post(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const taskToCreate = Task.createFromRequest({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      });
      validateTask(taskToCreate);
      const task = await tasksService.save(taskToCreate);
      res.json(task);
    })
  );

tasksRouter
  .route('/:taskId')
  .get(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const task = await tasksService.getById(
        req.params.boardId,
        req.params.taskId
      );
      res.json(task);
    })
  )
  .delete(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      await tasksService.remove(req.params.taskId);
      res.sendStatus(204);
    })
  )
  .put(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const task = await tasksService.update(req.params.taskId, req.body);
      res.json(task);
    })
  );

module.exports = tasksRouter;
