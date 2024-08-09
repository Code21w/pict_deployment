// components/Dashboard.tsx
'use client';
import { useCallback } from 'react';
import { DragDropContext, Droppable, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import Column from '@/components/travelItinerary/dnd/Column';
import { useBoard } from '@/components/travelItinerary/dnd/BoardContext';
import useWindowSize from '@/hooks/useWindowSize';

export default function Dashboard() {
  const { boardState, dispatch } = useBoard();
  const { isMobile } = useWindowSize(); // eslint-disable-line no-unused-vars

  const onDragEnd = useCallback(
    (result: DropResult) => {
      // console.log(result);
      if (!result.destination) return; // dropped nowhere

      const source: DraggableLocation = result.source;
      const destination: DraggableLocation = result.destination;

      // Reordering column
      if (result.type === 'COLUMN') {
        dispatch({ type: 'MOVE_COLUMN', payload: { source, destination } });
        return;
      }
      // Reordering or moving tasks
      if (result.type === 'TASK') {
        dispatch({ type: 'MOVE_TASK', payload: { source, destination } });
      }
    },
    [dispatch]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='dashboard' type='COLUMN' direction='horizontal'>
        {(
          provided,
          snapshot // eslint-disable-line no-unused-vars
        ) => (
          <ul
            className='grid md:grid-cols-3 gap-3'
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '8px',
            }}
          >
            {boardState.ordered.map((key, index) => (
              <Column
                key={key}
                index={index}
                listTitle={key}
                listOfTasks={boardState.columns[key]}
              />
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
