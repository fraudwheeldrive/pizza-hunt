const { Pizza } = require('../models');

const pizzaController = {
    // the functions will go in here as methods

    //get all pizza
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    };

// get one pizza by id 

getPizzaById({ params }, res) {
    Pizza.findOne({_id: params.id })
    .then(dbPizzaData => {
        //if no pizza is found, send 404
        if (!dbPizzaData) {
            res.status(404).json({ message: 'no pizza found with this id' });
        }
        res.json(dbPizzaData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    });
},

};

module.exports = pizzaController;

