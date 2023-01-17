const { User, Thought } = require('../models');

module.exports = {

//Many of these written without syntactic sugar due to me being lazy and it's arguably harder to write
//This route works now, forgot my include moment.js statement
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {console.log(err);
                res.sendStatus(400);
            });
    },

    //works now
    //get a single thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Cannot find thought with that ID, please try again' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Works now
    //post route to create thought (Needed help with this)
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },


//
    //put route to update a thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
             { new: true, runValidators: true })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'Was not able to update thought' })
                    : res.json(dbThoughtData)
            )
            .then(() => res.json({ message: 'Thought updated!' }))
            .catch((err) => res.status(500).json(err));
    },


    //delete route to remove a thought by ID
    //This route works now
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'Cannot find thought with that ID, please try again' })
                    : dbThoughtData.delete({ _id: { $in: Thought } })
            )
            .then(() => res.json({ message: 'Thought deleted' }))
            .catch((err) => res.status(500).json(err));
    },

    //post route to create a reaction (Wrote this one without synactic sugar (too confusing))
    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $addToSet: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought with this id" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
      },

      //delete route to remove a reaction
      removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.json(err));
      },
    };


