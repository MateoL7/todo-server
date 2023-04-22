const express = require('express');
const {
  all,
  allTodosByUser,
  item,
  update,
  insert,
  remove,
} = require('../controllers/todos.controller');

const router = express.Router();
// const router = express.Router({ mergeParams: true });

// const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

// router.use(authentication);
router.use(authorization);

router.get('/', allTodosByUser);
router.get('/:id', item);
router.post('/', insert);
router.delete('/:id', remove);
router.put('/:id', update);

module.exports = router;
