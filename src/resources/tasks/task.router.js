const tasksRouter = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');
const asyncErrorHandler = require('../../helpers/errorHandlers')
  .asyncErrorHandler;

tasksRouter
  .route('/')
  .get(
    asyncErrorHandler(async (req, res) => {
      try {
        const tasks = await tasksService.getAll(req.params.boardId);
        res.json(tasks);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .post(
    asyncErrorHandler(async (req, res) => {
      try {
        const task = await tasksService.save(
          Task.createFromRequest({
            title: req.body.title,
            order: req.body.order,
            description: req.body.description,
            userId: req.body.userId,
            boardId: req.params.boardId,
            columnId: req.body.columnId
          })
        );
        res.json(task);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  );

tasksRouter
  .route('/:taskId')
  .get(
    asyncErrorHandler(async (req, res) => {
      try {
        console.log(req.params.boardId, req.params.taskId);
        const task = await tasksService.getById(
          req.params.boardId,
          req.params.taskId
        );
        res.json(task);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .delete(
    asyncErrorHandler(async (req, res) => {
      try {
        await tasksService.remove(req.params.taskId);
        res.sendStatus(204);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .put(
    asyncErrorHandler(async (req, res) => {
      try {
        const task = await tasksService.update(req.params.taskId, req.body);
        res.json(task);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  );

module.exports = tasksRouter;
