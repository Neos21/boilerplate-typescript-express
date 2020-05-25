import * as express from 'express';

import Controller from './controller';
import UserModel  from '../models/user-model';
import UserEntity from '../entities/user-entity';

/** Users Controller */
export default class UsersController {
  /** コントローラ */
  private controller: Controller = new Controller();
  /** モデル */
  private userModel: UserModel = new UserModel();
  
  /**
   * 全件取得する
   * 
   * @param res レスポンス
   */
  async findAll(res: express.Response): Promise<void> {
    try {
      const result = await this.userModel.findAll();
      return this.controller.findSuccess(res)(result);
    }
    catch(error) {
      return this.controller.findError(res)(error);
    }
  }
  
  /**
   * ID を指定して1件取得する
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  async findById(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.userModel.findById(id);
      return this.controller.findSuccess(res)(result);
    }
    catch(error) {
      return this.controller.findError(res)(error);
    }
  }
  
  /**
   * 登録する
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = new UserEntity(null, req.body.name, req.body.age);
      const result = await this.userModel.create(user);
      return this.controller.createSuccess(res)(result);
    }
    catch(error) {
      return this.controller.editError(res)(error);
    }
  }
  
  /**
   * 登録 or 更新する
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = new UserEntity(req.body.id, req.body.name, req.body.age);
      const result = await this.userModel.update(user);
      return this.controller.editSuccess(res)(result);
    }
    catch(error) {
      return this.controller.editError(res)(error);
    }
  }
  
  /**
   * 削除する
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.userModel.delete(id);
      return this.controller.editSuccess(res)(result);
    }
    catch(error) {
      return this.controller.deleteError(res)(error);
    }
  }
}
