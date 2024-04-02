const express = require('express');
const router = express.Router();
const usersController = require('./controllers/userControllers');
const userMiddleware = require('./middlewares/userMiddleware');
const igdesController = require('./controllers/igdeControllers');
const igdeMiddleware = require('./middlewares/igdeMiddleware');



router.get('/users', igdeMiddleware.tokenValidation, usersController.getAll);
router.post('/users', igdeMiddleware.tokenValidation, userMiddleware.validateUserBody, usersController.createUser);
router.delete('/users/:id', igdeMiddleware.tokenValidation, usersController.deleteUser);
router.put('/users/:id', igdeMiddleware.tokenValidation, userMiddleware.validateUserBody, usersController.updateUser);

router.post('/login', igdeMiddleware.validateLoginBody, igdesController.loginIgdes);
router.get('/igdes', igdeMiddleware.tokenValidation, igdesController.getAllIgdes);
router.post('/igdes', igdeMiddleware.validateIgdeBody, igdesController.createIgde);
router.delete('/igdes/:id', igdeMiddleware.tokenValidation, igdesController.deleteIgde);
router.put('/igdes/:id', igdeMiddleware.tokenValidation, igdeMiddleware.validateIgdeBody, igdesController.updateIgde);

module.exports = router;
