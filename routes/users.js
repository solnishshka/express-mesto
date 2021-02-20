const router = require('express').Router();
const { avatarValidator, profileValidator } = require('../middlewares/validators/usersValidator');

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', getUser);

router.patch('/me', profileValidator, updateProfile);

router.patch('/me/avatar', avatarValidator, updateAvatar);

module.exports = router;
