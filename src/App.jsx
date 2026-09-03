import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";

function App() {
  let [todo, setTodo] = useState("");
  let [todosArray, setTodosArray] = useState([]);

  const handleEdit = () => {};

  const handleDelete = (e, id) => {
    console.log(id);
  };

  const handleAdd = () => {
    setTodosArray([...todosArray, { todo, isCompleted: false, id: uuidv4() }]);
    setTodo("");
    console.log(todosArray);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todosArray.findIndex((todo) => {
      return todo.id === id;
    });
    let newTodosArray = [...todosArray];
    newTodosArray[index].isCompleted = !newTodosArray[index].isCompleted;
    setTodosArray(newTodosArray);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-[90vh]  bg-violet-200 p-4 rounded-2xl my-2">
        <div className="add_todo my-5">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="bg-violet-50 w-80 h-8 rounded-sm"
            type="text"
            name="todo"
            id="todo"
          />

          <button
            onClick={handleAdd}
            className="bg-violet-600 hover:bg-violet-800 cursor-pointer px-2 py-1 text-white transition-all duration-300 rounded-md mx-3  "
          >
            Add
          </button>
        </div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todosArray.map((todo) => {
            return (
              <div key={todo.id} className="flex w-full justify-between my-2">
                <input
                  onChange={handleCheckBox}
                  type="checkbox"
                  value={todo.isCompleted}
                  name={todo.id}
                  id="checkBox"
                />
                <div
                  key={todo}
                  className={`${todo.isCompleted ? "line-through" : ""}`}
                >
                  {todo.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={handleEdit}
                    className="bg-violet-900 hover:bg-violet-800 cursor-pointer px-2 py-1 text-white transition-all duration-300 rounded-md mx-2  "
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, todo.id)}
                    className="bg-violet-600 hover:bg-violet-800 cursor-pointer px-2 py-1 text-white transition-all duration-300 rounded-md mx-2  "
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
