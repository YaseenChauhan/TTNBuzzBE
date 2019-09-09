const User = require('../models/user');
const Buzz = require('../models/buzz');
const Comment = require('../models/comment');

module.exports = {
    getAllBuzz: async (req, res, next) => {
        try {
            const buzz = await Buzz.find().populate('postedBy').populate('comments').populate('commentedBy');
            if (buzz) {
                res.status(200).json({
                    buzz,
                    success: true
                }
                );
            }
            else {
                res.status(404).json({
                    message: 'no buzz posted yet',
                    success: false
                })
            }
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getBuzzByUserId: async (req, res, next) => {
        try {
            const buzz = await Buzz.find({ postedBy: req.user.id }).populate('postedBy').populate('comments');
            if (buzz) {
                res.status(200).json(buzz);
            }
            else {
                res.status(404).json({
                    message: 'Buzz does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    },
    createBuzz: async (req, res, next) => {
        try {
            const user = await User.findById({ _id: req.user.id });
            if (user) {
                const newBuzz = new Buzz(req.body);
                newBuzz.postedBy = user;
                if (req.file) {
                    newBuzz.buzzImage = '/uploads/' + req.file.filename;
                }
                await newBuzz.save();
                user.buzzs.push(newBuzz);
                await user.save();
                res.status(201).json(newBuzz);

            }
            else {
                res.status(404).json({
                    message: 'User does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    updateBuzz: async (req, res, next) => {
        try {
            const { buzzId } = req.params;
            const buzz = req.body;
            const user = await Buzz.findByIdAndUpdate(buzzId, buzz);
            if (user) {
                res.status(201).json(user);
            }
            else {
                res.status(404).json({
                    message: 'Buzz does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },

    modifyBuzz: async (req, res, next) => {
        try {
            const { buzzId } = req.params;
            const buzz = req.body;
            const user = await Buzz.findByIdAndUpdate(buzzId, buzz);
            if (user) {
                res.status(201).json(user);

            }
            else {
                res.status(404).json({
                    message: 'Buzz does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    likeBuzz: async (req, res, next) => {
        const userId = req.user.id;
        const { buzzId } = req.params;
        try {
            const buzz = await Buzz.findById(buzzId);
            if (buzz) {
                buzz.likes = req.body.likes;
                if (!buzz.likedBy.includes(userId)) {
                   buzz.likedBy = [...buzz.likedBy, userId];
                }
                else {
                    const index = buzz.likedBy.indexOf(userId);
                    buzz.likedBy.splice(index, 1);

                   // buzz.likedBy = buzz.likedBy.filter((buzz, i) => (index !== i));
                }
                await buzz.save();
                res.status(201).json(buzz);
            }
            else {
                res.status(404).json({
                    message: 'Buzz does n\'t exist',
                    success: false
                })
            }

        }
        catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    createComment: async (req, res, next) => {
        const userId = req.user.id;
        const { buzzId } = req.params;
        const { comments } = req.body;
        try {
            const buzz = await Buzz.findById(buzzId);
            if (buzz) {
                let comment = new Comment();
                comment.buzzId = buzzId;
                comment.commentedBy = userId;
                comment.comments = comments;
                comment.save()
                    .then(insertedComment => {
                        comment.populate('commentedBy', (err, populatedComment) => {
                            if (err) {
                                res.status(500).json(error);
                            } else {
                                buzz.comments.push(populatedComment);
                                buzz.save()
                                    .then(result => {
                                        res.status(201).json(populatedComment);
                                    })
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json(error);
                    });
            }
            else {
                res.status(404).json({
                    message: 'Buzz does n\'t exist',
                    success: false
                })
            }

        }
        catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    getCommentById: async (req, res, next) => {
        try {
            const { buzzId } = req.params;
            const comment = await Comment.find({ buzzId: buzzId }).populate('commentedBy');
            if (comment) {
                res.status(200).json(comment);
            }
            else {
                res.status(404).json({
                    message: 'Buzz does n\'t exist',
                    success: false
                })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: error });
        }

    },
    getComments: async (req, res, next) => {
        try {
            const comment = await Comment.find().populate('commentedBy');
            if (comment) {
                res.status(200).json(comment);
            }
            else {
                res.status(404).json({
                    message: 'No Comments found',
                    success: false
                })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: error });
        }

    }

}