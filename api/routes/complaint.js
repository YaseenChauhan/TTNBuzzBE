const express = require('express');
const router = express.Router();

const authenticate = require('../../middleware/authenticate');
const complaintController = require('../controllers/complaint');

router.get('/', authenticate, complaintController.getAllComplaint);
router.get('/:userId', authenticate, complaintController.getComplaint);
router.post('/:userId', authenticate, complaintController.submitComplaint);
router.patch('/:complaintId', authenticate, complaintController.modifyComplaint);
router.put('/:complaintId', authenticate, complaintController.updateComplaint);
router.delete('/:complaintId', authenticate, complaintController.deleteComplaint);

module.exports = router;