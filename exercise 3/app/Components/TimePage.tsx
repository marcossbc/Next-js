export default function TimePage() {

  const now = new Date().toLocaleTimeString();


  return <p>Current server time: {now}</p>;
}
