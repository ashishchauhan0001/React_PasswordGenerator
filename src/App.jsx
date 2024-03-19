import { useState,useCallback,useEffect,useRef } from 'react'

function App() {

  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
 // useRef use
 const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()_+{}():>\?";
    
    for (let index = 1; index <=length; index++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }

    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);  for only selecting some limited values
    window.navigator.clipboard.writeText(password)
  
  },[password])

useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  //  console.log(str.length);


  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700"> 
    <h3 className='text-3xl text-center text-white my-5 '>Password Generator</h3> 
    <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
      />
      <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-green-700">Copy</button>
    </div>

     <div className="flex text-sm gap-x-2">
      <div className="flex item-center gap-x-1">
        <input 
        type="range"
        min={6}
        max={100}
        className='cursor-pointer'
        value={length} 
        onChange={(e)=>{
          setLength(e.target.value);
        }}/>
        <label> Length: {length} </label>
      </div>
      <div className="flex item conter gap-x-1">
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>{
          setNumberAllowed((prev)=>!prev);
        }}
         />
         <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex item conter gap-x-1">
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
        id="charcterInput"
        onChange={()=>{
          setCharAllowed((prev)=>!prev);
        }}
         />
         <label htmlFor="charcterInput">Characters</label>
      </div>
     </div>

  </div>
    
  )
}

export default App
