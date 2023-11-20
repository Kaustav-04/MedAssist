import {useState} from 'react'
function App() {
  const [ans,setAns] = useState([])
  const [value,setValue] = useState('')
  const submitHandler = () => {
    console.log(value)
    getAns(value)
  }

  const getAns = async(message) => {
    try {
      const Response =  await fetch("/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      })
      const Data = await Response.json();
      console.log(Data)
      setAns((prev) => {return [...prev, {inp: message, rep: Data}]})
      return Data
    } catch (error) {
      return ;
    }
  }
  return (
    <div className="App">
      <div id='form'>
        <input
          type="text"
          onChange={(e)=>setValue(e.target.value)}
          id="chat-input"
          name="text"
          placeholder="Enter your question..."
        />
        <button  id='submit' onClick={submitHandler}>
          Ask MedAssist
        </button>
      </div>
      <>
      {ans.map((i)=>
        <p> 
            {`Q : ${i.inp}` }
            <br/>
            <br/>
            {`MedAssist : ${ i.rep }`}
        </p>)}
      </>
      
        
   
      <p>
        MedAssist is working towards making everyone, everywhere healthier by
        offering services that connect and make health information meaningful.
        We want to provide people with the information they need to make
        health-related decisions.
        <br />
        <br />
      </p>
      <footer>Designed and Developed by Ankita Kundu &copy; 2023</footer>
    </div>
  );
}

export default App;
