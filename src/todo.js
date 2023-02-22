import React, { useEffect, useState } from 'react'
import "./todo.css"

const getLocalData = () => {
    const lists= localStorage.getItem("mytodolist")
    if(lists)
    {
        return JSON.parse(lists)
    }
    else
    {
        return[]
    }
}

const Todo = () => {

    const [inputdata,setInputData]=useState("")
    const [items,setItems]=useState(getLocalData)
    const [isEditItem,setIsEditItem]=useState("")
    const [toggleButton,setToggleButton]=useState(false)

    // Add Items
    const addItems = () => {
        if(!inputdata)
        {
            alert("Empty Data ")
        }
        else if(inputdata && toggleButton)
        {
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem) 
                    {
                        return{...curElem , name:inputdata} 
                    }
                    return curElem
                })
            )
            setInputData("")
            setIsEditItem(null)
            setToggleButton(false)

        }
        else
        {
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name:inputdata,
            }
            setItems([...items,myNewInputData])
            setInputData("")
        }
    }
    
    // Edit Items
    const editItem =(index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)

    }

    // Delete Items
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index
        })
        setItems(updatedItems)
    }
    const removeAll = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    } , [items])


  return (
    <>
    <div className='main-div'>

        <div className='child-div'>
        <figure>

            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your Items In The Bucket 😊</figcaption>

          </figure>

        <div className='addItmes'>
            <input
            type="text"
            placeholder='Add Itmes Now'
            className='form-control'
            value ={inputdata}
            onChange={(event)=> setInputData(event.target.value)}
            />
            {toggleButton ? 
            <i class="far fa-edit add-btn" onClick={addItems}></i> : 
            <i class="fa fa-plus add-btn" onClick={addItems}></i>
            }
            
        </div>

        {/*  Show Items */}

        <div className='showItems'>
        {items.map((curElem) => {
            return (
            <div className='eachItem' key={curElem.id}>
                <h3>{curElem.name}</h3>
                 <div className='todo-btn'>
                 <i class="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                 <i class="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id) }></i>  
                 </div>
            </div>    
            )
        })}
               
        </div>

        <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="REMOVE ALL" onClick={removeAll}>
                <span>SHOW LIST</span>
            </button>

        </div>
        
        </div>

    </div>
    
    </>
  )
}

export default Todo
