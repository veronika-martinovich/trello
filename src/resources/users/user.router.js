const usersRouter = require('express').Router();
const usersService = require('./user.service');
const asyncErrorHandler = require('../../helpers/errorHandlers')
  .asyncErrorHandler;

usersRouter
  .route('/')
  .get(
    asyncErrorHandler(async (req, res) => {
      const users = await usersService.getAll();
      res.json(users);
    })
  )
  .post(
    asyncErrorHandler(async (req, res) => {
      const user = await usersService.save(req.body);
      res.status(200).send(user);
    })
  );

usersRouter
  .route('/:userId')
  .get(
    asyncErrorHandler(async (req, res) => {
      const user = await usersService.get(req.params.userId);
      res.status(200).send(user);
    })
  )
  .delete(
    asyncErrorHandler(async (req, res) => {
      await usersService.remove(req.params.userId);
      res.sendStatus(204);
    })
  )
  .put(
    asyncErrorHandler(async (req, res) => {
      const user = await usersService.update(req.params.userId, req.body);
      res.status(200).send(user);
    })
  );

module.exports = usersRouter;
