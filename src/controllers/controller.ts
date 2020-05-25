import * as express from 'express';

/** Controller : 共通処理 */
export default class Controller {
  /**
   * 取得系の成功時処理
   * 
   * @param res レスポンス
   * @return レスポンス関数
   */
  findSuccess(res: express.Response): Function {
    return (result: unknown): void => {
      res.status(200);  // OK
      res.json(result);
    };
  }
  
  /**
   * 取得系の失敗時処理
   * 
   * @param res レスポンス
   * @return レスポンス関数
   */
  findError(res: express.Response): Function {
    return (error: unknown): void => {
      res.status(404);  // Not Found
      res.json(error);
    };
  }
  
  /**
   * 登録の成功時処理
   * 
   * @param res レスポンス
   * @return レスポンス関数
   */
  createSuccess(res: express.Response): Function {
    return (result: unknown): void => {
      res.status(200);  // OK
      res.json(result);
    };
  }
  
  /**
   * 削除対象がない場合の失敗時処理
   * 
   * @param res レスポンス
   * @return レスポンス関数
   */
  deleteError(res: express.Response): Function {
    return (error: unknown): void => {
      res.status(404);  // Not Found
      res.json(error);
    };
  }
  
  /**
   * 更新・削除の成功時処理
   * 
   * @param res レスポンス
   * @return レスポンス関数
   */
  editSuccess(res: express.Response): Function {
    return (result: unknown): void => {
      res.status(204);  // No Content
      res.json(result);
    };
  }
  
  /**
   * 登録・更新・削除の失敗時処理
   * 
   * @param res レスポンス
   * @return レスポンス関数
   */
  editError(res: express.Response): Function {
    return (error: unknown): void => {
      res.status(500);  // Internal Server Error
      res.json(error);
    };
  }
}
