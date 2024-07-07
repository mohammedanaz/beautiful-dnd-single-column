import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const list = [
  {id:1, name:'item-1'},
  {id:2, name:'item-2'},
  {id:3, name:'item-3'},
  {id:4, name:'item-4'},
  {id:5, name:'item-5'}
]


const reorder = (arr, startIndex, endIndex)=>{
  const result = Array.from(arr);
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex,0, removed)
  return result
}

function App() {
  const [items, setItems] = useState(list)
  const onEnd = (result)=>{
    console.log(result);
    const reorderedItems = reorder(items, result.source.index, result.destination.index)
    setItems(reorderedItems)    
  }
  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId='dropId-1'>
        {(provided, snapshop)=>(
          <div ref={provided.innerRef}>
            {items.map((item, index)=>(
              <Draggable 
              draggableId={`${item.id}`} 
              key={item.id} 
              index={index}
              >
                {(provided, snapshop)=>(
                  <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                    <div style={{padding: '10px', backgroundColor:'lightblue', width:'300px', marginBottom:'5px' }}>
                      {item.name}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App
