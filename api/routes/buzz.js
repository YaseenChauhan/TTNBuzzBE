const express = require('express');
const router = express.Router();
const passport = require('passport');

const passportConf = require('../../passport');
const authenticate = require('../../middleware/authenticate');
const buzzController = require('../controllers/buzz');
const { storage, upload, fileFilter } = require('../../config/multre.config');

router.get('/', authenticate, buzzController.getAllBuzz);
router.get('/user', authenticate, buzzController.getBuzzByUserId);
router.post('/', authenticate, upload.single('buzzImage'), buzzController.createBuzz);
router.patch('/:buzzId', authenticate, buzzController.modifyBuzz);
router.put('/:buzzId', authenticate, buzzController.updateBuzz);
router.post('/comment/:buzzId', authenticate, buzzController.createComment);
router.get('/comment/:buzzId', authenticate, buzzController.getCommentById);
router.get('/comment/', authenticate, buzzController.getComments);
router.post('/like/:buzzId', authenticate, buzzController.likeBuzz);



// router.post('/',passport.authenticate('jwt',{session: false}),buzzController.submitPost);

module.exports = router;






// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         // let today = new Date();

//         // let dd = today.getDate();
//         // let mm = today.getMonth() + 1;
//         // let yyyy = today.getFullYear();

//         // if (dd < 10) {
//         //     dd = '0' + dd;
//         // }
//         // if (mm < 10) {
//         //     mm = '0' + mm;
//         // }
//         // let date = dd + '-' + mm + '-' + yyyy;

//         cb(null, new Date().toISOString() + file.originalname)
//     }

// })
// const fileFilter = function (req, file, cb) {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     }
//     else {
//         cb(new Error("Not supported"), false);
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });

// const Buzz = require('../models/buzz');

// router.get('/', (req, res, next) => {
//     Buzz.find()
//         .exec()
//         .then(result => {
//             const response = {
//                 count: result.length,
//                 buzzs: result.map(buzz => {
//                     return {
//                         _id: buzz._id,
//                         name: buzz.name,
//                         email: buzz.email,
//                         isAdmin: buzz.isAdmin,
//                         buzzImage : buzz.buzzImage,
//                         request: {
//                             type: 'GET',
//                             url: 'http://localhost:3000/buzz/' + buzz._id
//                         }
//                     }
//                 })
//             }
//             res.status(200).json(response);
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// })
// router.post('/', upload.single('buzzImage'), (req, res, next) => {
//     const buzz = new Buzz({
//         _id: mongoose.Types.ObjectId(),
//         name: req.body.name,
//         pass: req.body.password,
//         email: req.body.email,
//         isAdmin: req.body.isAdmin,
//         buzzImage : req.file.path
//     });
//     buzz.save().then(result => {
//         res.status(201).json({
//             message: "Data submitted successfully",
//             data: {
//                 _id: result._id,
//                 name: result.name,
//                 email: result.email,
//                 password: result.password,
//                 isAdmin: result.isAdmin,
//                 request: {
//                     type: 'POST',
//                     url: 'http://localhost:3000/buzz'
//                 }
//             }
//         })

//     })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })
// router.get('/:buzzId', (req, res, next) => {
//     const id = req.params.buzzId;
//     Buzz.findById(id)
//         .exec()
//         .then(result => {
//             if (result) {
//                 res.status(201).json({
//                     message: "Data retrieved successfully",
//                     data: {
//                         _id: result._id,
//                         name: result.name,
//                         email: result.email,
//                         isAdmin: result.isAdmin,
//                         request: {
//                             type: 'GET',
//                             url: 'http://localhost:3000/buzz/'
//                         }
//                     }
//                 })
//             } else {
//                 res.status(404).json({
//                     message: "No record found for provided buzz id"
//                 })
//             }

//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

// router.patch('/:buzzId', (req, res, next) => {
//     const id = req.params.buzzId;
//     const updatebuzz = req.body;
//     Buzz.update({ _id: id }, { $set: updatebuzz })
//         .exec()
//         .then(result => {
//             res.status(201).json({
//                 message: "Data updated successfully",
//                 request: {
//                     type: 'Patch',
//                     url: 'http://localhost:3000/buzz/' + id
//                 }
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

// router.delete('/:buzzId', (req, res, next) => {
//     const id = req.params.buzzId;
//     Buzz.remove({ _id: id })
//         .exec()
//         .then(result => {
//             res.status(201).json({
//                 message: "Data deleted successfully",
//                 request: {
//                     type: 'Delete',
//                     url: 'http://localhost:3000/buzz/'
//                 }
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })
// module.exports = router;