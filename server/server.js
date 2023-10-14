const express = require('express');
const app = express();
//注册职工路由模块
app.use('/api', require('./router/staff'));
//注册部门路由模块
app.use('/api', require('./router/department'));
//注册职位路由模块
app.use('/api', require('./router/position'));
const PORT = 9000;
app.listen(PORT, console.log(`服务器在${PORT}端口号运行`));