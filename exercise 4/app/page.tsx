// "use client";

import Link from "next/link";
import { fetchTodos } from "./lib/todo";
import { deleteTodo } from "./action/delete";
import { toggleTodo } from "./action/toggle";




export default async function Home() {
  const todos = await fetchTodos()

  const time = new Date().toLocaleTimeString();

  
  return (
     <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 Todo App</h1>
        <p className="text-sm text-gray-500 mb-4">Last updated: {time}</p>

        <div className="mb-6">
          <Link
            href="/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ➕ Add New Todo
          </Link>
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No todos yet!</p>
            <p className="text-gray-400 text-sm mt-2">Create your first todo to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map(todo => (
              <div key={todo._id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <form action={toggleTodo.bind(null, todo._id)}>
                    <button
                      type="submit"
                      className="text-2xl hover:scale-110 transition-transform"
                      title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {todo.completed ? '✅' : '⬜'}
                    </button>
                  </form>

                  <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {todo.title}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/edit/${todo._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                    title="Edit todo"
                  >
                    ✏️
                  </Link>

                  <form action={deleteTodo.bind(null, todo._id)}>
                    <button
                      type="submit"
                      className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                      title="Delete todo"
                    >
                      🗑️
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
    
  );
}