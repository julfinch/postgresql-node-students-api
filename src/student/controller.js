const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getStudentById = (req, res) => {
    // ID COMES AS A STRING, SO WE NEED TO PARSE IT
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    // TO CHECK IF THE EMAIL EXIST
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.send("Email already exists.");
        }
        
        // ADD STUDENT TO DB IF EMAIL DOESN'T EXIST YET
        pool.query(queries.addStudent, [ name, email, age, dob ], (error, results) => {
            if (error) throw error;
            res.status(201).send("Student created successfully!");
        })
    })
}

const removeStudent = (req, res) => {
    // ID COMES AS A STRING, SO WE NEED TO PARSE IT
    const id = parseInt(req.params.id);
    // CHECK FIRST IF THE STUDENT EXIST IN DB BEFORE DELETING USING ID
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound) {
            res.send("Student doesn't exist")
        }

        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student removed successfully")
        })
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound) {
            res.send("Student doesn't exist")
        }

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student updated successfully")
        })
    })
}

module.exports = {
    getStudents, getStudentById, addStudent, removeStudent, updateStudent,
}