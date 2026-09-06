import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todosArray, setTodosArray] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    let todosString = localStorage.getItem("todosArray");
    if (todosString) {
      let todosArray = JSON.parse(todosString);
      setTodosArray(todosArray);
    }
  }, []);

  const saveToLS = (todosArray) => {
    localStorage.setItem("todosArray", JSON.stringify(todosArray));
  };

  const toggleFinished = (e) => {
    setShowCompleted(!showCompleted);
  };

  const handleEdit = (e, id) => {
    let todo = todosArray.filter((todo) => todo.id === id);
    setTodo(todo[0].todo);
    let newTodosArray = todosArray.filter((todo) => todo.id != id);
    setTodosArray(newTodosArray);
    saveToLS(newTodosArray);
  };

  const handleDelete = (e, id) => {
    let newTodosArray = todosArray.filter((todo) => {
      return todo.id !== id;
    });
    setTodosArray(newTodosArray);
    saveToLS(newTodosArray);
  };

  const handleAdd = () => {
    let newTodosArray = [
      ...todosArray,
      { todo, isCompleted: false, id: uuidv4() },
    ];

    setTodosArray(newTodosArray);
    setTodo("");
    saveToLS(newTodosArray);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;

    let newTodosArray = todosArray.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    setTodosArray(newTodosArray);
    saveToLS(newTodosArray);
  };

  return (
    <>
      <Navbar />

      <div className="mx-auto mt-4 w-full max-w-155 rounded-[28px] border border-white/40 bg-white/20 p-5 shadow-[inset_0_18px_30px_rgba(127,160,190,0.5)] backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <input
            onChange={handleChange}
            value={todo}
            className="h-16 flex-1 rounded-[18px] border border-white/30 bg-white/15 px-5 text-xl text-slate-700 placeholder:text-slate-400/90 focus:border-sky-300 focus:outline-none shadow-[0_10px_10px_rgba(127,160,190,0.5)]"
            type="text"
            name="todo"
            id="todo"
            placeholder="What needs to be done?"
          />

          <button
            onClick={handleAdd}
            disabled={todo.length <= 2}
            className="flex h-16 items-center justify-center rounded-[18px] bg-sky-400/90 px-6 text-xl font-semibold text-white shadow-[0_10px_10px_rgba(56,144,209,0.5)] transition-all duration-300 hover:bg-sky-500 disabled:bg-sky-200 disabled:shadow-[inset_0_3px_6px_rgba(56,144,209,1)] disabled:text-neutral-600 cursor-pointer border border-sky-300"
          >
            Save
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-155 rounded-[28px] border border-white/35 bg-white/18 p-8 shadow-[inset_0_10px_10px_rgba(127,160,190,0.5)] backdrop-blur-sm">
        {/* <div className="flex gap-3">
          {[{ label: "All", active: true }, { label: "Completed" }].map(
            (tab) => (
              <button
                key={tab.label}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  tab.label === "All"
                    ? "bg-sky-400 text-white shadow-[0_8px_16px_rgba(56,144,209,0.24)]"
                    : "bg-white/25 text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ),
          )}
        </div> */}
        <div className="completed w-fit bg-sky-300 px-6 shadow-[0_10px_10px_rgba(56,144,209,0.5)] transition-all duration-300 p-2 rounded-[28px] flex gap-2 ">
          <input
            type="checkbox"
            name="checkBox"
            checked={showCompleted}
            onChange={toggleFinished}
          />
          <h3 className="text-xl font-semibold text-white ">Completed</h3>
        </div>
        <div className="mt-5 space-y-3 ">
          {todosArray.length === 0 && (
            <div className="my-4 font-bold text-neutral-500">
              No todos for now
            </div>
          )}
          {todosArray.map((todo) => {
            return (
              (showCompleted || !todo.isCompleted) && (
                <div
                  key={todo.id}
                  className="flex items-center justify-between rounded-[18px] border border-white/25 bg-white/20 px-4 py-3 shadow-[0_6px_6px_rgba(56,144,209,0.2)]"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <input
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={todo.isCompleted}
                      value={todo.isCompleted}
                      name={todo.id}
                      id={todo.id}
                      className="h-5 w-5 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                    />
                    <p
                      className={`min-w-0 flex-1 truncate text-[1.1rem] font-medium ${
                        todo.isCompleted
                          ? "text-slate-500 line-through decoration-slate-500/80"
                          : "text-slate-700"
                      }`}
                    >
                      {todo.todo}
                    </p>
                  </div>

                  <div className="ml-4 flex items-center gap-2 text-slate-500">
                    <button
                      onClick={(e) => handleEdit(e, todo.id)}
                      className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-xl bg-sky-200 shadow-[inset_0_4px_4px_rgba(56,144,209,0.5)] text-slate-500 transition-all duration-200 hover:bg-sky-300 hover:shadow-[0_4px_4px_rgba(56,144,209,0.5)]"
                    >
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="text-[1rem]"
                      />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, todo.id)}
                      className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-xl bg-sky-200 shadow-[inset_0_4px_4px_rgba(56,144,209,0.5)] text-slate-500 transition-all duration-200 hover:bg-sky-300 hover:shadow-[0_4px_4px_rgba(56,144,209,0.5)]"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-[1rem]" />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="mt-5 text-center text-sm font-medium text-slate-600/90">
          {`${todosArray.filter((item) => !item.isCompleted).length} active • ${
            todosArray.filter((item) => item.isCompleted).length
          } completed • ${todosArray.length} total`}
        </div>
      </div>
    </>
  );
}

export default App;
