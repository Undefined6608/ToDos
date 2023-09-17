// 导入 express
const {Router} = require('express');
// 引入专注功能控制器
const feedBackCtrl = require('../controller/feedBackController');
// 创建 router 对象
const router = Router();

// 添加反馈
router.post('/', feedBackCtrl.addFeedBack);

// 抛出路由
module.exports = router;