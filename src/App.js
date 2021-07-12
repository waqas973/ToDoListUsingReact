import { useState } from 'react';
import './App.css';
import ToDoLists from './ToDoLists';
function App() {
  const [inputList , setinputList ] = useState('');
  const [Items ,setItems] = useState([]);
  const handleChange = (e)=>{
      setinputList(e.target.value);
  }
  const ListOfItems = ()=>{
    setItems((OldVal)=>{
      return[
        ...OldVal,
        inputList
      ]
    });
    setinputList('');
}
const deleteItems = (id)=>{
  setItems((OldVal)=>{
     return  OldVal.filter((item,i)=>{
          return i !== id;
     });
  });
}
  return (
    <div className="App">
      <div className="container">
          <h6>ToDO List</h6>
          <div className="filed-wrapper">
           <div className="input-wrap">
             <input type="text"  placeholder="Add an items" autoComplete="off" onChange={handleChange} value={inputList}/>
             <button className=" btn plus-btn" onClick={ListOfItems}>+</button>
           </div>
           <ol className="list">
             {
               Items.map((itemVal,i)=>{
               return <ToDoLists itemVal = {itemVal} key={i} id={i} deleteItems={deleteItems} />
               })
             }
           </ol>
           </div>
         </div>
    </div>
  );
}

export default App;
