const boardsRouter = require('express').Router();
const boardsService = require('./board.service');
const asyncErrorHandler = require('../../helpers/errorHandlers')
  .asyncErrorHandler;

boardsRouter
  .route('/')
  .get(
    asyncErrorHandler(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards);
    })
  )
  .post(
    asyncErrorHandler(async (req, res) => {
      const board = await boardsService.save(req.body);
      res.json(board);
    })
  );

boardsRouter
  .route('/:boardId')
  .get(
    asyncErrorHandler(async (req, res) => {
      const board = await boardsService.get(req.params.boardId);
      res.json(board);
    })
  )
  .delete(
    asyncErrorHandler(async (req, res) => {
      await boardsService.remove(req.params.boardId);
      res.sendStatus(204);
    })
  )
  .put(
    asyncErrorHandler(async (req, res) => {
      const board = await boardsService.update(req.params.boardId, req.body);
      res.json(board);
    })
  );

module.exports = boardsRouter;
