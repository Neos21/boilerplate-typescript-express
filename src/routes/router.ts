import * as express from 'express';

import asyncWrap from './util-async-wrap';
import usersRouter from './users-router';

const router = express.Router();

// デバッグ用 : マウント・パスを指定していないので全てのアクセスで実行させる
router.use((req, _res, next) => {
  console.log(`${req.url} [${req.method}] : ${JSON.stringify(req.body)}`);
  next();
});

// ルートパスを定義する
router.get('/', asyncWrap(async (_req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500));  // モック用遅延関数
  res.send('Hello');
}));

// エラーミドルウェアのテスト用ルーティング
router.get('/test-error-1', asyncWrap(async (_req, res) => {
  await new Promise((_resolve, reject) => setTimeout(reject, 500));  // モック用遅延関数
  res.send('Test Error 1');  // 未到達
}));
router.get('/test-error-2', asyncWrap(async (_req, res) => {
  await new Promise((_resolve, reject) => setTimeout(() => reject('Test Error 2'), 500));  // モック用遅延関数
  res.send('Test Error 2');  // 未到達
}));

// API 別にルータを設定する
router.use('/users', usersRouter);

// エラーミドルウェア
router.use((error: express.ErrorRequestHandler, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error Middleware', error);
  res.status(500);
  res.send(error);
});

export default router;
