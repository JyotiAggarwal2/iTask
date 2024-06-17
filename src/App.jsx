import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { AiFillDelete } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }    
  }, [])
  

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }  

  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>{
      return i.id === id
    })
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleRemove = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLocalStorage()
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage()
  }


  return (
    <>
    <Navbar/>
      <div className='md:container mx-2 md:mx-auto bg-violet-100 rounded-xl p-5 my-5 min-h-[80vh] md:w-1/2'>
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your to-do tasks at one place</h1>
        <div className="addTodo my-4 flex flex-col gap-2">
          
          <h2 className="text-lg font-bold">Add a Task</h2>
          
          <div className="flex gap-2">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-md p-1' />
            <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-800 disabled:bg-violet-600 hover:bg-violet-950 px-4 py-2 text-sm font-bold rounded-md text-white'>Save</button>        
          </div>
        </div>
        
        <input onChange={toggleFinished} className='mx-1' type="checkbox" checked={showFinished} />Show Finished Tasks
        
        <div class="h-[1px] w-full bg-gray-300"></div>

        <h2 className='text-lg font-bold my-4'>Your To-dos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='my-2'>No task to display</div>}

          {todos.map(item=>{          

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 px-2 py-1 text-sm font-bold rounded-md mx-1 text-white flex items-center gap-1'><FaEdit/>Edit</button>
                <button onClick={(e)=>{handleRemove(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 px-2 py-1 text-sm font-bold rounded-md mx-1 text-white flex items-center gap-1'><AiFillDelete/>Remove</button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
