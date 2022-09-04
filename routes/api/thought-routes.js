const router = require('express').Router();

const {
    addThoughts,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/:userId')
    .post(addThoughts)
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);
router
    .router('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction)
    
module.exports= router;