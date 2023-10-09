// import router
const router = require('express').Router();

// import controllers
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtControllers');

// * routes
router.route('/')
    .get(getThoughts)
    .post(createThought);

// routes requiring thoughtID
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// routes requiring thoughtId and reactions
router.route('/:thoughtId/reactions')
    .post(createReaction);

// routes requiring thoughtId and reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// export router
module.exports = router;