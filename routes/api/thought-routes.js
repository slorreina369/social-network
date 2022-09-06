const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThoughts,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThoughts)
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .post(addReaction)
    .delete(removeThought);
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;