import * as express from 'express';

import asyncWrap from './util-async-wrap';
import UsersController from '../controllers/users-controller';

const router = express.Router();

// コントローラを用意する
const usersController = new UsersController();

// 全件取得
router.get('/', asyncWrap(async (_req, res) => {
  await usersController.findAll(res);
}));

// ID を指定して1件取得
router.get('/:id', asyncWrap(async (req, res) => {
  await usersController.findById(req, res);
}));

// 登録
router.post('/', asyncWrap(async (req, res) => {
  await usersController.create(req, res);
}));

// 更新
router.put('/:id', asyncWrap(async (req, res) => {
  await usersController.update(req, res);
}));

// 削除
router.delete('/:id', asyncWrap(async (req, res) => {
  await usersController.delete(req, res);
}));

export default router;
