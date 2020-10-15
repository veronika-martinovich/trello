const boardsRouter = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const asyncErrorHandler = require('../../helpers/errorHandlers')
  .asyncErrorHandler;

boardsRouter
  .route('/')
  .get(
    asyncErrorHandler(async (req, res) => {
      try {
        const boards = await boardsService.getAll();
        res.json(boards);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .post(
    asyncErrorHandler(async (req, res) => {
      try {
        const board = await boardsService.save(
          Board.createFromRequest(req.body)
        );
        res.json(board);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  );

boardsRouter
  .route('/:boardId')
  .get(
    asyncErrorHandler(async (req, res) => {
      try {
        const board = await boardsService.get(req.params.boardId);
        res.json(board);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .delete(
    asyncErrorHandler(async (req, res) => {
      try {
        await boardsService.remove(req.params.boardId);
        res.sendStatus(204);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  )
  .put(
    asyncErrorHandler(async (req, res) => {
      try {
        const board = await boardsService.update(req.params.boardId, req.body);
        res.json(board);
      } catch (error) {
        res.status(404).send('404 Not Found');
      }
    })
  );

module.exports = boardsRouter;
