const router = require('express').Router();

const {
    addThoughts,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .post(addThoughts)
router
    .route('/:thoughtId')
    .put(addReaction)
    .delete(removeThought);
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;