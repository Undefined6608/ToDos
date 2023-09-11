// 导入 express
const {Router} = require('express');
// 引入专注功能控制器
const todosCtrl = require('../controller/todosController');
// 创建 router 对象
const router = Router();

// 代办事项保存
router.post('/saveToDo',todosCtrl.saveToDo);

// 查询代办
router.get('/queryToDo',todosCtrl.queryToDo);

// 修改代办
router.post('/modifyToDo',todosCtrl.modifyToDo);

// 完成代办
router.post('/finishToDo',todosCtrl.finishToDo);

// 删除代办
router.delete('/deleteToDo',todosCtrl.deleteToDo);

module.exports = router;