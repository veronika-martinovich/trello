const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await usersService.getAll();
      res.json(users.map(user => User.toResponse(user)));
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  })
  .post(async (req, res) => {
    try {
      const user = await usersService.save(User.createFromRequest(req.body));
      res.status(200).send(User.toResponse(user));
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const user = await usersService.get(req.params.id);
      res.status(200).send(User.toResponse(user));
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await usersService.remove(req.params.id);
      res.status(200).send(User.toResponse(user));
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  })
  .put(async (req, res) => {
    try {
      const user = await usersService.update(req.params.id, req.body);
      res.status(200).send(User.toResponse(user));
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  });

module.exports = router;
