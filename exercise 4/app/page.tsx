import Link from "next/link";
import { fetchTodos } from "./lib/todo"; 


import TodoList from "@/app/TodoList"; 
import SearchInput from "./SearchInput";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  
  const search = typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : "";

  // MongoDB Server-side Fetch
  const rawTodos = await fetchTodos(search);
  
  const todos = rawTodos.map(t => ({
    ...t,
    createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
    updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined
  }));

  const time = new Date().toLocaleTimeString();

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 Todo App</h1>
        <p className="text-sm text-gray-500 mb-4">Last updated: {time}</p>

        {/* SEARCH FORM */}
        <form method="GET" className="mb-5 flex gap-2" id="search-form">
          <SearchInput defaultValue={search} />
          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
            Search
          </button>
        </form>

        {/* LIST COMPONENT */}
        <TodoList initialTodos={todos} />

      </div>
    </main>
  );
}