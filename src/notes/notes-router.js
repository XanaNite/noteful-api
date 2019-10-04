const path = require('path')
const express = require('xss')
const NotesService = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
    id: note.id,
    title: xss(note.title),
    content: xss(note.content),
    folderId: note.folderId,
    modified_date: note.modified_date,
})

notesRouter
    .route('/')
    .get((req, res, next) =>{
        //code
    })
    .post(jsonParser, (req, res, next) =>{
        //code
    })

notesRouter
    .route('/:notes_id')
    .all((req, res, next) =>{
        //code
    })
    .get((req, res, next) =>{
        //code
    })
    .delete((req, res, next) =>{
        //code
    })
    .path(jsonParser, (req, res, next) =>{
        //code
    })

module.exports = notesRouter