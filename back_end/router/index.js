// 导入 express
const {Router} = require('express');
// 创建 router 对象
const router = Router();

// 加载子路由
// 用户子路由
router.use('/user',require('./userRouter'));
// 代办事项子路由
router.use('/todo',require('./todosRouter'));
// 专注子路由
router.use('/intent',require('./concentrateOnRouter'));
// 反馈子路由
router.use('/feedback',require('./feedbackRouter'));

// 抛出路由
module.exports = router;

