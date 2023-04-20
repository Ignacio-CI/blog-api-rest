const express = require('express');
const router = express.Router();
const multer = require('multer');
const ArticleController = require('../controllers/Article');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/articles/')
    },

    filename: (req, file, cb) => {
        cb(null, 'article' + Date.now() + file.originalname)
    }
});

const uploads = multer({storage: storage})


// Test Routes
router.get('/ruta-de-prueba', ArticleController.test);
router.get('/course/', ArticleController.course);

// Usable Routes
router.post('/create', ArticleController.create);
router.get('/articles/:latest?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getOneArticle);
router.delete('/article/:id', ArticleController.deleteOneArticle);
router.put('/article/:id', ArticleController.updateArticle);
router.post('/upload-image/:id', [uploads.single('file1')], ArticleController.upload)

module.exports = router;