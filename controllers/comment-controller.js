const { Comment, Pizza } = require('../models');

const commentController = {
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({_id }) => {
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaID },
                { $push: { comments: _id } },
                {new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));

    },

    removeComment ({ params }, res) {
        Comment.findOneAndDelete({_id: params.commentID })
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({ message: "no comment with this id!"})
            }
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaID },
                { $pull: {comments: params.commentID } },
                { new: true }
            );
        });
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this ID '});
                return;
            }
            res.json(dbPizzaData);
        })
    }

}


module.exports = commentController;