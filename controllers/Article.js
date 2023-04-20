const validator = require('validator');
const Article = require('../models/Articles');
const fs = require('fs');

// Testing middlewares
const test = (req, res) => {
    return res.status(200).json({
        message: 'I am a testing action in my test controller'
    });
};

const course = (req, res) => {
    return res.status(200).json([{
        course: "Master in React",
        author: "Ignacio Cerda",
        url: "http://www.ignition.dev",
    },
    {
        course: "Master in Vuejs",
        author: "Ignacio Cerda",
        url: "http://www.ignition.dev",
    }]);
};

// Usable middlewares
const create = async (req, res) => {
    
    try {
        // Gather all the params to save through post
        let parameters = req.body;
        // Validate data
        dataValidation(parameters);
        
        // Create object to save into the database (automatically).
        // Assing values to object (manually). Not recommended.
        // article.title = parameters.title; 
        const article = new Article(parameters);

        
        // Save the article into the database
        const savedArticle = await article.save();

        // Return the result
        return res.status(200).json({
            status: "Success",
            article: savedArticle,
            message: "The article has been saved successfully"
        });


    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: "The article hasn't been saved",
        });
    }
};

const getArticles = async (req, res) => {
    try {
        let query = Article.find({});

        if (req.params.latest) {
            query = query.limit(2);
        }

        const articles = await query.sort({ date: -1 }).exec();

        return res.status(200).send({
            status: 'Success',
            articles: articles,
        });
    } catch (error) {
        return res.status(error).json({
            status: 'Error',
            message: "No articles found",
        });
    }
};

const getOneArticle = async (req, res) => {  
    try {
        const id = req.params.id;
        const oneArticle = await Article.findById(id).exec();

        return res.status(200).json({
            status: 'Success',
            article: oneArticle
        })
    } catch (error) {
        return res.status(error).json({
            status: 'Error',
            message: "No article found",
        });
    }
};

const deleteOneArticle = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedArticle = await Article.findOneAndDelete({_id: id}).exec();

        return res.status(200).json({
            status: 'Success',
            message: 'Article deleted successfully',
            deleted: deletedArticle
        });
    } catch (error) {
        return res.status(error).json({
            status: 'Error',
            message: "Impossible to delete article", 
        });
    }
}

const updateArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const parameters = req.body;
        
        dataValidation(parameters);

        const updateArticle = await Article.findByIdAndUpdate({_id: id}, parameters, {returnDocument: 'after'});

        return res.status(200).json({
            status: 'Success',
            updated: updateArticle,
        })
    } catch (error) {
        return res.status(error).json({
            status: 'Error',
            message: "Imposible to update article", 
        });
    }
};

const dataValidation = async (parameters) => {
    let validateTitle = !validator.isEmpty(parameters.title) && validator.isLength(parameters.title, {min: 5, max: undefined});
    let validateContent = !validator.isEmpty(parameters.content);

    if(!validateTitle || !validateContent) {
        throw new Error('Imposible to validate the information')
    };
}

const upload = (req, res) => {
    // get uploaded image file
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({
            status: 'Error',
            message: 'No file uploaded'
        });
    }
    // file's name
    const fileName = String(req.file.originalname);
    
    // file's extension
    const splitFile = fileName.split(".");
    const fileExtension = splitFile[1];

    // verify right extension
    if (fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'gif') {
        fs.unlink(req.file.path, () => {
            return res.status(400).json({
                status: 'error',
                message: 'invalid file extension'
            })
        })
    }
    else {
        // update article
        return res.status(200).json({
            status: 'Success',
            splitFile,
            files: req.file
        });
    }
}

module.exports = {
    test,
    course,
    create,
    getArticles,
    getOneArticle,
    deleteOneArticle,
    updateArticle,
    upload,
}