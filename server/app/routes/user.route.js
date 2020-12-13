const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/registerMe', userController.register);
router.post('/loginMe', userController.login);
router.post('/add', userController.register);
router.delete('/delete/:userId', userController.delete);
router.delete('/deleteMany', userController.deleteMany);
router.patch('/patch', userController.update);
router.get('/list', userController.list);
router.get('/getMany', userController.getMany);
router.get('/:id', userController.getById);


module.exports = router;


