import Image from "next/image";
import Counter from "./Components/Counter";
import { Suspense } from "react";
import SlowComponent from "./Components/SlowComponents";

export default  async function Home() {

    const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return (
    <div>
      <h1 className="text-xl font-bold bg-blue-500 text-white p-4">Products</h1>
      <ul>
        {data.products.slice(0, 5).map((product: any) => (
          <li className="border-b border-gray-300 py-2" key={product.id}>{product.title}
          
          </li>
        ))}
      </ul>
      <Counter/>

      <Suspense fallback={<p>Loading slow component...</p>}>
        <SlowComponent/>
      </Suspense>
    </div>
  );
}
