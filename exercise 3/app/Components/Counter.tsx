"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>

      <button className="bg-blue-500 " onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}