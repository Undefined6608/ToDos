// 导入 express
const {Router} = require('express');
// 引入专注功能控制器
const concentrateOnCtrl = require('../controller/concentrateOnController');
// 创建 router 对象
const router = Router();

// 创建专注条目
router.post('/createIntent', concentrateOnCtrl.createIntent);

// 获取用户专注条目
router.get('/queryIntent', concentrateOnCtrl.queryIntent);

// 结束专注条目
router.post('/endIntent', concentrateOnCtrl.endIntent);

// 抛出路由
module.exports = router;