const Mongoose = require("mongoose");
const TodoSchema = Mongoose.Schema({
    userid: String,
      
    todoid : String,
      
    title: String,
    completed : Boolean}
)
const TodoModel = Mongoose.model("todo",TodoSchema);
module.exports = TodoModel;