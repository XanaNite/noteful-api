const path = require('path')
const express = require('xss')
const FoldersService = require('./folders-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
    id: folder.id,
    name: xss(folder.name),
})

foldersRouter
    .route('/')
    .get((req, res, next) =>{
        const knexInstance = req.app.get('db')
        
        FoldersService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serializeFolder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) =>{
        const {name} = req.body
        const newFolder = {name}

        for(const [key, value] of Object.entries(newFolder)){
            if(value == null){
                return res.status(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })
            }
        }

        const knexInstance = req.app.get('db')

        FoldersService.insertFolders(knexInstance, newFolder)
            .then(folder =>{
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${folder}`))
                    .json(serializeFolder(folder))
            })
            .catch(next)
    })

foldersRouter
    .route('/:folders_id')
    .all((req, res, next) =>{
        const knexInstance = req.app.get('db')

        FoldersService.getById(knexInstance, req.params.folder_id)
            .then(folder =>{
                if(!folder){
                    return res.status(404).json({
                        error: {message: `Folder doesn't exist`}
                    })
                }
                res.folder = folder
                next()
            })
            .catch(next)
    })
    .get((req, res, next) =>{
        res.json(serializeFolder(res.folder))
    })
    .delete((req, res, next) =>{
        FoldersService.deleteFolder(knexInstance, req.params.folder_id)
            .then(numFoldersAffected =>{
                res.status(204).end()
            })
            .catch(next)
    })
    .path(jsonParser, (req, res, next) =>{
        const {name} = req.body
        const folderToUpdate = {name}
        const updatedFields = Object.values(folderToUpdate).filter(Boolean).length

        if(updatedFields === 0){
            return res.status(400).json({
                error:{message: `Request body must contain a 'name'`}
            })
        }

        FoldersService.updateFolder(knexInstance, req.params.folder_id, folderToUpdate)
            .then(numFoldersAffected =>{
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = foldersRouter