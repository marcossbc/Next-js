import { greet} from "./form/greet";


export default  async function Home() {

  return (
    
    <form action={greet} method="post" className="p-4">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <button type="submit">Submit</button>
    </form>
  
  );
}
