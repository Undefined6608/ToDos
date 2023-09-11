// 导入 express
const {Router} = require('express');
// 创建 router 对象
const router = Router();
// 引入用户功能控制器
const userCtrl = require('../controller/userController');

// 创建请求路由
/*router.get('/hello',(req, res, next) => {
    res.send("HelloWorld!");
})*/

// 测试路由
router.get('/hello', userCtrl.hello);

// 验证电话号码是否重复
router.post('/phoneOccupy', userCtrl.phoneOccupy);

// 注册
router.post('/register', userCtrl.register);

// 电话号码登录
router.post('/phoneLogin', userCtrl.phoneLogin);

// 退出登录
router.post('/logout', userCtrl.logout);

// 抛出路由
module.exports = router;

