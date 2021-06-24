const router = require('express').Router();


const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

router
.route('/:pizzaID/:commentID')
.put(addReply)
.delete(removeComment)

router.route('/pizzaID/:commentID/:replyID').delete(removeReply);

router.route('/:pizzaId').post(addComment);

router.route('/pizzaId/:commentId').delete(removeComment);




module.exports = router; 