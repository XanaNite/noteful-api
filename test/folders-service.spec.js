const FoldersService = require('../src/folders/folders-service')
const knex = require('knex')

describe('Folders service object', () =>{
    let db 
    let testFolders = []

    before('make knex instance', () =>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    after(`disconnect from db`, () => db.destroy())

    before(`clean the table`, () => db('noteful_folders').truncate())

    afterEach(() => db('noteful_folders').truncate())

    context(`Given 'noteful_folders' has data`, () =>{
        //code
    })

    context(`Given 'noteful_folders' has no data`, () =>{
        //code
    })

    describe(`insertFolder()`, () =>{
        //code
    })
})