const usersRouter = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validation');
const asyncErrorHandler = require('../../helpers/errorHandlers')
  .asyncErrorHandler;

usersRouter
  .route('/')
  .get(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'));
      const users = await usersService.getAll();
      res.json(users.map(user => User.toResponse(user)));
    })
  )
  .post(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const userToCreate = User.createFromRequest(req.body);
      validateUser(userToCreate);
      const user = await usersService.save(userToCreate);
      res.status(200).send(User.toResponse(user));
    })
  );

usersRouter
  .route('/:userId')
  .get(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const user = await usersService.get(req.params.userId);
      res.status(200).send(User.toResponse(user));
    })
  )
  .delete(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      await usersService.remove(req.params.userId);
      res.sendStatus(204);
    })
  )
  .put(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const user = await usersService.update(req.params.userId, req.body);
      res.status(200).send(User.toResponse(user));
    })
  );

module.exports = usersRouter;
