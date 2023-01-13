const { User, Thought } = require('../models');

module.exports = {


    //get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },


    //get a single user by ID and populated thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Cannot find user with that ID, please try again' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },


    //POST a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },


    //PUT route to update a user by ID
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Was not able to update user' })
                    : res.json(user)
            )
            .then(() => res.json({ message: 'User updated!' }))
            .catch((err) => res.status(500).json(err));
    },

    //DELETE user by ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Cannot find user with that ID, please try again' })
                    : user.delete({ _id: { $in: user } })
            )
            .then(() => res.json({ message: 'User deleted' }))
            .catch((err) => res.status(500).json(err));
    },

}