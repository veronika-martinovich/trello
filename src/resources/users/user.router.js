const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(user => User.toResponse(user)));
  })
  .post(async (req, res) => {
    const user = await usersService.save(User.createFromRequest(req.body));
    res.status(200).send(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
  })
  .delete(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    res.status(200).send(User.toResponse(user));
  })
  .put(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).send(User.toResponse(user));
  });

module.exports = router;
