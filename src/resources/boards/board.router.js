const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const boards = await boardsService.getAll();
      res.json(boards);
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  })
  .post(async (req, res) => {
    try {
      const board = await boardsService.save(Board.createFromRequest(req.body));
      res.json(board);
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const board = await boardsService.get(req.params.id);
      res.json(board);
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  })
  .delete(async (req, res) => {
    try {
      const board = await boardsService.remove(req.params.id);
      res.json(board);
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  })
  .put(async (req, res) => {
    try {
      const board = await boardsService.update(req.params.id, req.body);
      res.json(board);
    } catch (error) {
      res.status(404).send('404 Not Found');
    }
  });

module.exports = router;
