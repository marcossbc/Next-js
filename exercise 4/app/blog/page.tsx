import React from "react";
import Link from "next/link";


export 
const Blog = async () => {
  const posts = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  )
    .then((res) => res.json())
    .then((data) => data.slice(0, 10));

  return (
    <div>
      <h1>Blog Posts</h1>

      {posts.map((post: any) => (
        <div className="border p-4 mb-4 bg-light" key={post.id}>
          <Link   href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;