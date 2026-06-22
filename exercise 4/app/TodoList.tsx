'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getRelativeTime } from "./lib/date"; 

import { bulkToggle } from "./action/bulkToggle";
import { bulkDelete } from "./action/bulkDelete";
import { deleteTodo } from "./action/delete";
import { toggleTodo } from "./action/toggle";
import { Todo } from "./types/todo";

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectTodo = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === initialTodos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(initialTodos.map((todo) => todo._id));
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`are you sure deleting ${selectedIds.length} todos?`)) {
      await bulkDelete(selectedIds);
      setSelectedIds([]);
      router.refresh(); 
    }
  };

  const handleBulkToggle = async (completed: boolean) => {
    await bulkToggle(selectedIds, completed);
    setSelectedIds([]);
    router.refresh(); 
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Link href="/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          ➕ Add New Todo
        </Link>

        {selectedIds.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkToggle(true)}
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              ✅ Complete ({selectedIds.length})
            </button>
            <button
              onClick={() => handleBulkToggle(false)}
              className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              ⬜ Incomplete
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 text-sm bg-rose-600 text-white rounded-md hover:bg-rose-700"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {initialTodos.length === 0 ? (
        <p className="text-gray-500">No todos found!</p>
      ) : (
        <div className="space-y-3">
          
          {/* SELECT ALL CHECKBOX */}
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              checked={initialTodos.length > 0 && selectedIds.length === initialTodos.length}
              onChange={handleSelectAll}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {selectedIds.length === initialTodos.length ? "Deselect All" : "Select All Todos"}
            </span>
          </div>

          {/* TODOS ITEMS */}
          {initialTodos.map((todo) => (
            <div
              key={todo._id}
              className={`flex items-center justify-between bg-gray-50 border rounded-lg p-4 transition-all ${
                selectedIds.includes(todo._id) ? "border-blue-400 bg-blue-50/30" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                
                {/* BULK CHECKBOX */}
                <input
                  type="checkbox"
                  checked={selectedIds.includes(todo._id)}
                  onChange={() => handleSelectTodo(todo._id)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-2"
                />

                {/* TOGGLE STATUS BUTTON */}
                <button
                  onClick={async () => {
                    await toggleTodo(todo._id);
                    router.refresh();
                  }}
                  className="hover:scale-110 transition-transform"
                >
                  {todo.completed ? "✅" : "⬜"}
                </button>

                <span>
                  {todo.priority === "high" && "🔥"}
                  {todo.priority === "medium" && "⚡"}
                  {todo.priority === "low" && "🌱"}
                </span>

                <div className="flex flex-col">
                  <span className={todo.completed ? "line-through text-gray-400 font-medium" : "text-gray-800 font-medium"}>
                    {todo.title}
                  </span>
                  {/* TIMESTAMPS REAL-TIME */}
                  <span className="text-xs text-gray-400 mt-0.5">
                    {getRelativeTime(todo.createdAt)}
                    {todo.updatedAt && ` • updated ${getRelativeTime(todo.updatedAt)}`}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Link href={`/edit/${todo._id}`} className="hover:scale-110 transition-transform">
                  ✏️
                </Link>

                <button
                  onClick={async () => {
                    if (confirm("are you sure deleting ?")) {
                      await deleteTodo(todo._id);
                      router.refresh();
                    }
                  }}
                  className="hover:scale-110 transition-transform text-rose-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}