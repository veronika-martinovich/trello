const usersRouter = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const asyncErrorHandler = require('../../helpers/errorHandlers')
  .asyncErrorHandler;

usersRouter
  .route('/')
  .get(
    asyncErrorHandler(async (req, res) => {
      try {
        const users = await usersService.getAll();
        res.json(users.map(user => User.toResponse(user)));
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .post(
    asyncErrorHandler(async (req, res) => {
      try {
        const user = await usersService.save(User.createFromRequest(req.body));
        res.status(200).send(User.toResponse(user));
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  );

usersRouter
  .route('/:userId')
  .get(
    asyncErrorHandler(async (req, res) => {
      try {
        const user = await usersService.get(req.params.userId);
        res.status(200).send(User.toResponse(user));
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .delete(
    asyncErrorHandler(async (req, res) => {
      try {
        await usersService.remove(req.params.userId);
        res.sendStatus(204);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .put(
    asyncErrorHandler(async (req, res) => {
      try {
        const user = await usersService.update(req.params.userId, req.body);
        res.status(200).send(User.toResponse(user));
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  );

module.exports = usersRouter;
