import * as express from 'express';
import * as bodyParser from 'body-parser';

import router from './routes/router';

const app = express();

// CORS を許可する
app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
  //res.header('Access-Control-Allow-Origin', '*');  // or 'http://localhost:8080'
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// POST データを受け取るための設定を行う
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// ルーティングを定義する
app.use('/', router);

// サーバを起動する (ユニットテスト時は実行されないようにする)
if(!module.parent) {
  app.listen(8080, () => {
    console.log('Server Started');
  });
}

// ユニットテスト用に export する
export default app;
