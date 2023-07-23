# STUDENTS DATABASE API 

## INITIALIZE PROJECT
1. Install the necessary dependencies and package.
    ```shell
    npm init -y
    npm i --save express
    npm i pg
    ```
## FOLDER STRUCTURE
1. Create a `src folder` and under it is another `student folder`. In the root folder, create a new file `server.js`.
    ```shell
    📁postgresql-node-api(ROOT)
        ├─📁src
        │    ├─📁student
        │    └─📄filters.component.ts
        ├─📄server.js
        ├─📄package-lock.json
        ├─📄README.md
        └─📄package.json
    ```
## INITIALIZE SERVER.JS
1. Paste the code below inside `server.js` and run `node server.js`. We should see `Hello there` when we go to `localhost:3000/`
    ```shell
    const express = require("express");
    const app = express();
    const port = 3000;

    app.get("/", (req, res) => {
        res.send("Hello there!")
    })

    app.listen(port, () => console.log(`app listening on port ${port}`));
    ```
## INITIALIZE POSTGRESQL DATABASE
1. Open `SQL Shell(psql)` and just hit `enter` for server,database,port and username then input your password. If successfull, it should look like the one below:
    ```shell
    Server [localhost]:
    Database [postgres]:
    Port [5432]:
    Username [postgres]:
    Password for user postgres:
    psql (15.3)
    WARNING: Console code page (437) differs from Windows code page (1252)
            8-bit characters might not work correctly. See psql reference
            page "Notes for Windows users" for details.
    Type "help" for help.

    postgres=#
    ```
1. To check if we are indeed `CONNECTED` to the postgres, write `\conninfo` and we should see a message of confirmation.
    ```shell
    postgres=# \conninfo

    You are connected to database "postgres" as user "postgres" on host "localhost" (address "::1") at port "5432".
    postgres=#
    ```
1. To `SEE THE LIST OF TABLE in the postgres`, write `\l` and we should see the tables.
    ```shell
    postgres=# \l

   Name    |  Owner   | Encoding |          Collate           |           Ctype            | ICU Locale | Locale Provider |   Access privileges
    -----------+----------+----------+----------------------------+----------------------------+------------+-----------------+-----------------------
    postgres  | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            |
    template0 | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            | =c/postgres          +
            |          |          |                            |                            |            |                 | postgres=CTc/postgres
    template1 | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            | =c/postgres          +
            |          |          |                            |                            |            |                 | postgres=CTc/postgres
    (3 rows)
    ```
1. To `CREATE A DATABASE for the name list of students`, write `CREATE DATABASE students;`, mind the semicolon at the end. If successful, we should see a `CREATE DATABASE` below. You can check by writing `\l`.
    ```shell
    postgres=# CREATE DATABASE students;

    CREATE DATABASE
    ```
1. To `CONNECT TO THE NEWLY CREATED DATABASE students`, write `\c students` and a confirmation should follow.
    ```shell
    postgres=# \c students
    You are now connected to database "students" as user "postgres".
    students=#
    ```
1. To `CREATE A TABLE students UNDER NEWLY CREATED DATABASE students`, write `CREATE TABLE students (`, mind the `OPEN PARENTHESIS` at the end. We will start putting the parameters inside here and will end it with a `CLOSING PARENTHESIS` later.
    ```shell
    students=# CREATE TABLE students (
    students(#
    ```
1. Write `ID SERIAL PRIMARY KEY,` and hit enter. Next is `name VARCHAR(255),` then enter, `email VARCHAR(255),` then enter, `age INT,` then enter and lastly, `dob DATE);` and enter. Mind the `CLOSING PARENTHESIS` of the last parameter of the table before hitting enter. A confirmation `CREATE TABLE` should appear.
    ```shell
    students(# ID SERIAL PRIMARY KEY,
    students(# name VARCHAR(255),
    students(# email VARCHAR(255),
    students(# age INT,
    students(# dob DATE);
    CREATE TABLE
    students=#
    ```
1. To `DISPLAY THE TABLE` inside our database, write `\dt`
    ```shell
    students=# \dt
            List of relations
    Schema |   Name   | Type  |  Owner
    --------+----------+-------+----------
    public | students | table | postgres
    (1 row)


    students=#
    ```
1. To populate our table, we will `INSERT INTO students` by writing first `INSERT INTO students (name, email, age, dob)` then hit enter. After that, write their details with `VALUES ('Joe', 'joe@gmail.com', 48, '1973-04-28'), ('Anna', 'anna@gmail.com', 22, '2000-03-20');` then hit enter again. To see the result, let's `QUERY` to the table by writing `SELECT * FROM students;`.
    ```shell
    students=# INSERT INTO students (name, email, age, dob)
    students-# VALUES ('Joe', 'joe@gmail.com', 48, '1973-04-28'), ('Anna', 'anna@gmail.com', 22, '2000-03-20');
    INSERT 0 2
    students=# SELECT * FROM students;
    id | name |     email      | age |    dob
    ----+------+----------------+-----+------------
    1 | Joe  | joe@gmail.com  |  48 | 1973-04-28
    2 | Anna | anna@gmail.com |  22 | 2000-03-20
    (2 rows)

    students=#
    ```
1. To `GET STUDENT BY ID` , write `SELECT * FROM students WHERE id = 2;`. Mind the semicolon at the end!
    ```shell
    students=# SELECT * FROM students WHERE id = 2;

    id | name |     email      | age |    dob
    ----+------+----------------+-----+------------
    2 | Anna | anna@gmail.com |  22 | 2000-03-20
    (1 row)

    students=#
    ```
1. To `DELETE BY ID` , write `DELETE FROM students WHERE id = 3;`. Mind the semicolon at the end!
    ```shell
    students=# DELETE FROM students WHERE id = 3;
    DELETE 1
    students=# SELECT * FROM students;
    id | name  |      email      | age |    dob
    ----+-------+-----------------+-----+------------
    1 | Joe   | joe@gmail.com   |  48 | 1973-04-28
    2 | Anna  | anna@gmail.com  |  22 | 2000-03-20
    4 | Frank | frank@gmail.com |  34 | 2003-04-27
    (3 rows)


    students=#
    ```
## CONNECT DATABASE TO THE SERVER
1. Create a new file named `db.js` inside the root folder and write the codes below:
    ```shell
    const Pool = require("pg").Pool;

    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "students",
        password: "Write Password Here",
        port: 5432,
    });

    module.exports = pool;
    ```
## CREATE ROUTES.js, CONTROLLER.js, and QUERIES.js
Let's create the Model-View-Controller folder setup here under `student folder` for the separation of concerns.
### QUERIES.JS
Let's create a file for all the queries so that we can separate it from the business logic inside `controller.js` to avoid getting messy if the project grows where we will create a lot more queries in the future.

```shell
const getStudents = "SELECT * FROM students";

module.exports = {
    getStudents,
}
```
### CONTROLLER.JS
We will import here our `queries.js` so that we can query the students table.

```shell
const pool = require("../../db");

const getStudents = (req, res) => {
    pool.query("SELECT * FROM students", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getStudents,
}
```
### ROUTES.JS
1. Create `routes.js` under `student folder` and write the code below. 

    ```shell
    const { Router }  = require("express");
    const controller = require("./controller");

    const router = Router();

    router.get("/", controller.getStudents);

    module.exports = router;
    ```

1. Let's import the `routes.js` inside `server.js`. If we make a `GET` method inside `POSTMAN` for `localhost:3000/api/v1/students` endpoint, we should see `using api route` as a response.
    ```shell
    const express = require("express");
    const studentRoutes = require("./src/student/routes");

    const app = express();
    const port = 3000;

    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Hello there!")
    })

    app.use("/api/v1/students", studentRoutes);

    app.listen(port, () => console.log(`app listening on port ${port}`));
    ```
1. After this, if we do a `GET` method inside `POSTMAN` for `localhost:3000/api/v1/students`, we should get the result below:
    ```shell
    [
        {
            "id": 1,
            "name": "Joe",
            "email": "joe@gmail.com",
            "age": 48,
            "dob": "1973-04-27T16:00:00.000Z"
        },
        {
            "id": 2,
            "name": "Anna",
            "email": "anna@gmail.com",
            "age": 22,
            "dob": "2000-03-19T16:00:00.000Z"
        }
    ]
    ```