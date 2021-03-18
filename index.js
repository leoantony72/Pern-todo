const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create todo

app.post("/todos", async (req, res) => {
  try {
    console.log("hi")
    const { discription } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (discription) VALUES($1) RETURNING *",
      [discription]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { discription } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET discription = $1 WHERE todo_id = $2",
      [discription, id]
    );

    res.json("todo was updated");
  } catch (error) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id =$1", [
      id,
    ]);

    res.json("todo was deleted");
  } catch (error) {
    console.error(err.message);
  }
});

//Listen
app.listen(5000, () => {
  console.log(`server has started in Localhost 5000`);
});
