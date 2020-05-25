/** User Entity */
export default class UserEntity {
  /**
   * コンストラクタ
   * 
   * @param id ID (新規登録時は DB に自動採番させるので null を許容する)
   * @param name 氏名
   * @param age 年齢
   */
  constructor(public id: number | null, public name: string, public age: number) { }
}
