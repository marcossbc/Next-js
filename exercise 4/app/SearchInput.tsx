'use client'

import { useRouter } from "next/navigation";

export default function SearchInput({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (value === "") {
      router.push("/");
    }
  };

  return (
    <input
      type="text"
      name="search"
      defaultValue={defaultValue}
      placeholder="Search todo..."
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onInput={handleInput}
    />
  );
}