import UserEntity from '../entities/user-entity';

/** モック用遅延関数 */
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** User Model : DB 検索処理などは未実装。モックデータを返却している */
export default class UserModel {
  /**
   * 全件取得する
   * 
   * @return Entity の配列
   */
  async findAll(): Promise<Array<UserEntity>> {
    await sleep(500);
    return [
      new UserEntity(1, 'Test 1', 10),
      new UserEntity(2, 'Test 2', 20),
      new UserEntity(3, 'Test 3', 30)
    ];
  }
  
  /**
   * ID を指定して1件検索する
   * 
   * @param id ID
   * @return Entity
   */
  async findById(id: number): Promise<UserEntity> {
    await sleep(500);
    return new UserEntity(id, `Test ${id}`, 10);
  }
  
  /**
   * 登録する
   * 
   * @param user 登録情報を持つ Entity
   * @return 登録できた Entity
   */
  async create(user: UserEntity): Promise<UserEntity> {
    await sleep(500);
    // Entity を元に DB 登録を行い、登録時に採番された ID を受け取るモック関数
    const mockCreate = (entity: UserEntity): Promise<number> => Promise.resolve(entity ? 0 : -1);
    const newId = await mockCreate(user);
    return this.findById(newId);
  }
  
  /**
   * 登録 or 更新する
   * 
   * @param user 更新情報を持つ Entity
   * @return 登録 or 更新できたら true を返す
   */
  async update(user: UserEntity): Promise<boolean> {
    await sleep(500);
    // Entity を元に登録 or 更新を行い、成功したら true を返すモック関数
    const mockUpdate = (entity: UserEntity): Promise<boolean> => Promise.resolve(!!entity);
    return mockUpdate(user);
  }
  
  /**
   * 削除する
   * 
   * @param id ID
   * @return 削除できたら true を返す
   */
  async delete(id: number): Promise<boolean> {
    await sleep(500);
    // ID を元に削除を行い、成功したら true を返すモック関数
    const mockDelete = (id: number): Promise<boolean> => Promise.resolve(!!id);
    return mockDelete(id);
  }
}
