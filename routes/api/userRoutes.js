// import router
const router = require('express').Router();

// import controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userControllers');

// get all and post routes
router.route('/')
    .get(getUsers)
    .post(createUser);

// routes requiring userID
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// routes requiring userID and friendID
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

// export router
module.exports = router;