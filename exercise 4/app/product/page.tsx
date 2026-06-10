export default async function LiveDataPage() {
  const res = await fetch('https://dummyjson.com/products', {
    // cache: 'no-store', "awlays fetch fresh data"
    // cache:"force-cache", "always use cache, if not available fetch and cache it"
    // next : { revalidate: 10 }, "revalidate data every 10 seconds"
    next: { tags: ['products'] }, //"revalidate data when 'products' tag is invalidated"
  });
  const data = await res.json();
  const timestamp = new Date().toLocaleTimeString();

  return <p>🕒 Live fetched at: {timestamp}</p>;
}
