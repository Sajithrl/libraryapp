const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { books } = require('../models/books');

router.get('/', (req, res) => {
    books.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Books :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        books.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retriving books :' + JSON.stringify(err, undefined, 2)); }
        });
    });

router.post('/', (req, res) => {
    var bok = new books({
        name: req.body.name,
        authur: req.body.authur,
        year: req.body.year,
    });
    bok.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in books Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var bok = {
        name: req.body.name,
        authur: req.body.authur,
        year: req.body.year,
    };
    books.findByIdAndUpdate(req.params.id, { $set: bok }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in books Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    books.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in books Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;