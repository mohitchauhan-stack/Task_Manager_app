import Navbar from "./components/Navbar";

function App() {
  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleAdd = () => {};

  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-[90vh]  bg-violet-200 p-4 rounded-2xl my-2">
        <div className="add_todo my-5">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input
            className="bg-violet-50 w-80"
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
          <div className="todo flex">
            <div className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              eius.
            </div>
            <div className="buttons">
              <button
                onClick={handleEdit}
                className="bg-violet-600 hover:bg-violet-800 cursor-pointer px-2 py-1 text-white transition-all duration-300 rounded-md mx-2  "
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-violet-600 hover:bg-violet-800 cursor-pointer px-2 py-1 text-white transition-all duration-300 rounded-md mx-2  "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
