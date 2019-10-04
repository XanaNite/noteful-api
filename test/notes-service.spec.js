const NotesService = require('../src/notes/notes-service')
const knex = require('knex')

describe('Notes service object', () =>{
    let db 
    let testNotes = []

    before('make knex instance', () =>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    after(`disconnect from db`, () => db.destroy())

    before(`clean the table`, () => db('noteful_notes').truncate())

    afterEach(() => db('noteful_notes').truncate())

    context(`Given 'noteful_notes' has data`, () =>{
        //code
    })

    context(`Given 'noteful_notes' has no data`, () =>{
        //code
    })

    describe(`insertNote()`, () =>{
        //code
    })
})