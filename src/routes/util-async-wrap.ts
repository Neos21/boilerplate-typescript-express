import * as express from 'express';

/** Promise を返すインターフェース */
interface PromiseRequestHandler {
  (req: express.Request, res: express.Response, next: express.NextFunction): Promise<unknown>;
}

/**
 * 内部で async を使用できるラッパー関数・例外発生時も次のミドルウェアで処理できるよう next() を呼ぶ
 * 
 * Express 4 からは直接 async ミドルウェアを書けるが、例外を catch し next(error) を明示的に呼ぶ必要があるため、ラッパー関数を用意した
 */
export default function asyncWrap(fn: PromiseRequestHandler): express.RequestHandler {
  return (req: express.Request, res: express.Response, next: express.NextFunction): Promise<unknown> => fn(req, res, next)
    .catch((error) => {
      next(error || 'ERROR');  // 変数 error が null や undefined だとエラーミドルウェアに移動しないので適当な値を入れておく
    });
}
