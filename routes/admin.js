const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('category');

router.get('/', (req, res) => {
    res.render('admin/index');
})
router.get('/posts', (req, res) => {
    res.send('Posts page');
})
router.get('/categories', (req, res) => {
    res.render('admin/categories');
})
router.get('/categories/add', (req, res) => {
    res.render('admin/addcategories');
})
router.post('/categories/new', (req, res) => {
    var errors = [];

    if(!req.body.name && typeof req.body.name == undefined || req.body.name == null) {
        errors.push({text: 'Invalid Name'});
    }

    if(!req.body.slug && typeof req.body.slug == undefined || req.body.slug == null) {
        errors.push({text: 'Invalid Slug'});
    }
    
    if(req.body.name.length < 2) {
        errors.push({text: 'Name must be at least 2 characters'});
    }

    if(errors.length > 0) {
        res.render('admin/addcategories', {errors: errors});
    }else{
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }
        new Category(newCategory).save().then(() => {
            req.flash('success_msg', 'Category added');
            res.redirect('/admin/categories');
        }).catch(err => {
            require.flash('error_msg', 'Error adding category');
            res.redirect('/admin');
        })
    }    
})

module.exports = router;