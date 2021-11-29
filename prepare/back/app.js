const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const cors = require('cors');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const morgan = require('morgan');

const app = express();

app.set('port', process.env.NODE_ENV || 8000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // origin: 'http://127.0.0.1:5500',
    credentials: true,
  }),
);

app.use('/', indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  console.log(err);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '포트 대기중');
});
