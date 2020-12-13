
//Edit this to set controller prefix
const controllerPrefix = 'vendorReturns';
///////////////////////////////////
const controller = require('../controllers/'+controllerPrefix+'.controller');
const express = require('express');
const router = express.Router();

router.post('/add', controller.add);
router.patch('/patch', controller.update);
router.get('/list', controller.list);
router.delete('/delete/:id', controller.delete);
router.delete('/deleteMany', controller.deleteMany);
router.get('/getMany', controller.getMany);
router.get('/:id',controller.getById);
module.exports = router;


