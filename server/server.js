const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

// Obtener todas las tareas
app.get('/tareas/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1;', [userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err);
    }
});

//crear una nueva tarea
app.post('/tareas', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();
    try {
        const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5);`,
            [id, user_email, title, progress, date]);
        res.json(newToDo);
    } catch (error) {
        console.log(error);
    }
});


//editar una tarea
app.put('/tareas/:id', async (req, res) => {
    const {id} = req.params;
    const { title, progress} = req.body;
    try {
        const editTodo = await pool.query('UPDATE todos SET title = $1, progress = $2 WHERE id = $3;',
            [title, progress, id])
        res.json(editTodo);
    } catch (error) {
        console.error(error);
    }
})

//eliminar una tarea
app.delete('/tareas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.json(deleteToDo);
    } catch (error) {
        console.log(error)
    }
})

//registrarse
app.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const signup = await pool.query(`INSERT INTO users (email, hashed_password) VALUES ($1, $2)`, [email, hashedPassword]);

        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'});

        res.json({email, token})
    } catch (error) {
        console.error(error);
        if(error){
            res.json({detail: error.detail})
        }
    }
});


//iniciar sesion
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (!user.rows.length) return res.json({detail: 'El usuario no existe'});

        const success = await bcrypt.compare(password, user.rows[0].hashed_password)
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'});
        if (success) {
            res.json({'email' : user.rows[0].email, token});
        }else {
            res.json({detail: 'Contraseña incorrecta'});
        }

    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));