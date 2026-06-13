import React from 'react'



export async function generateStaticParams({params} : {params: {slug: string}}) {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await posts.json();
    return{
      
      title:data.title,
      body:data.body,

    }
  
    }
  
const blogPage = async ({ params } : { params: { slug: string } }) => {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.slug}`);
    const data = await post.json();
    console.log(data);
  

    if (!data) {
      return <div>not found</div>;
    }
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}

export default blogPage;
