const express = require('express');
const { createLink, getUserLinks, redirectLink, deleteLink, getLinkPreview } = require('../controllers/linkController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createLink);
router.post('/public', createLink);
router.get('/preview', auth, getLinkPreview);
router.get('/my', auth, getUserLinks);
router.delete('/:id', auth, deleteLink);

module.exports = router;