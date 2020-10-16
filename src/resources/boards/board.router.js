const boardsRouter = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const validateBoard = require('./board.validation');
const asyncErrorHandler = require('../../helpers/errorHandlers')
  .asyncErrorHandler;

boardsRouter
  .route('/')
  .get(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const boards = await boardsService.getAll();
      res.json(boards);
    })
  )
  .post(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const boardToCreate = Board.createFromRequest(req.body);
      validateBoard(boardToCreate);
      const board = await boardsService.save(boardToCreate);
      res.json(board);
    })
  );

boardsRouter
  .route('/:boardId')
  .get(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const board = await boardsService.get(req.params.boardId);
      res.json(board);
    })
  )
  .delete(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      await boardsService.remove(req.params.boardId);
      res.sendStatus(204);
    })
  )
  .put(
    asyncErrorHandler(async (req, res) => {
      // reject(Error('Oops!'))
      const board = await boardsService.update(req.params.boardId, req.body);
      res.json(board);
    })
  );

module.exports = boardsRouter;
