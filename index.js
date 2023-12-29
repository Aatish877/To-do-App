const Express = require("express")
const Mongoose =require("mongoose")
const BodyParser = require("body-parser")
const Cors = require("cors")

const TodoModel = require("./models/todo")

const path = require("path")

const app= new Express()

app.use(Express.static(path.join(__dirname, "./build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended:true}))
app.use(Cors())
Mongoose.connect("mongodb+srv://aatish:aatish@cluster0.euclaxo.mongodb.net/tododb?retryWrites=true&w=majority", {useNewUrlParser: true})



app.post('/add-todo', async (req, res) => {
  try {
    const { userid, todoid, title, completed } = req.body;

    // Create a new Todo document
    const newTodo = new TodoModel({
      userid,
      todoid,
      title,
      completed,
    });

    // Save the Todo document to the database
    const savedTodo = await newTodo.save();

    res.json(savedTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add the following routes to your backend code

// Update todo completion status
app.patch('/update-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    // Update the completed status in the database
    await TodoModel.findByIdAndUpdate(id, { completed });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete todo
app.delete('/delete-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the todo from the database
    await TodoModel.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve all todos
app.get('/get-todos', async (req, res) => {
  try {
    // Fetch all todos from the database
    const todos = await TodoModel.find();

    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/viewtodoapi",async(req,res)=>{
  try{
      var result=await TodoModel.find();
      res.send(result);

  }catch(error){
      res.status(500).send(error);
  }
})



app.listen(3011,()=>{
    console.log("server Started")
})