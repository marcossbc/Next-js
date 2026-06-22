"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("search") || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const q = value.trim();

    if (q) {
      router.push(`/?search=${encodeURIComponent(q)}`);
    } else {
      router.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search todo..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
}