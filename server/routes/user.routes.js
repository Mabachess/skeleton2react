import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import dbErrorHandler from '../helpers/dbErrorHandler'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/photo/:userID')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/api/users/defaultphoto')
  .get(userCtrl.defaultPhoto)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

router.route('/api/users/follow')
  .put(authCtrl.requireSignin,
    userCtrl.addFollowing,
    userCtrl.addFollower)
router.route('/api/users/unfollow')
  .put(authCtrl.requireSignin,
    userCtrl.removeFollowing,
    userCtrl.removeFollower)

router.route('/api/users/findpeople/:userId')
  .get(authCtrl.requireSignin, userCtrl.findPeople)

export default router
