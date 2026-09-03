import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");

  const [todosArray, setTodosArray] = useState([]);

  useEffect(() => {
    let todosString = localStorage.getItem("todosArray");
    if (todosString) {
      let todosArray = JSON.parse(localStorage.getItem("todosArray"));
      setTodosArray(todosArray);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todosArray", JSON.stringify(todosArray));
  };

  const handleEdit = (e, id) => {
    let todo = todosArray.filter((todo) => todo.id === id);
    setTodo(todo[0].todo);
    let newTodosArray = todosArray.filter((todo) => todo.id != id);
    setTodosArray(newTodosArray);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodosArray = todosArray.filter((todo) => todo.id != id);
    setTodosArray(newTodosArray);
    saveToLS();
  };

  const handleAdd = () => {
    setTodosArray([...todosArray, { todo, isCompleted: false, id: uuidv4() }]);
    setTodo("");
    saveToLS();
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
    saveToLS();
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
            Save
          </button>
        </div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todosArray.length === 0 && (
            <div className="my-4 font-bold text-neutral-500">
              No todos for now{" "}
            </div>
          )}
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
                    onClick={(e) => handleEdit(e, todo.id)}
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
