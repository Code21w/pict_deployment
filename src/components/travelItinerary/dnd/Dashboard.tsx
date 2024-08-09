// components/Dashboard.tsx
'use client';
import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import Column from './Column';
import { useBoard } from '@/components/travelItinerary/dnd/BoardContext';
import useWindowSize from '@/hooks/useWindowSize';
import { useCartStore } from '@/store/store';
import { TaskMap, Task, Board } from '@/app/travelItinery/types';

export default function Dashboard() {
  const { boardState, dispatch } = useBoard();
  const { isMobile } = useWindowSize();
  const currentCart = useCartStore((state) => state.currentCart); // 현재 장바구니 데이터를 가져옴
  const [columns, setColumns] = useState<TaskMap>({});

  // '장소보관함' 컬럼과 여행 일수에 따른 컬럼을 생성
  useEffect(() => {
    const travelDays = sessionStorage.getItem('travelDays');

    // '장소보관함' 컬럼에 currentCart 데이터를 넣음
    const initialColumns: TaskMap = {
      장소보관함: currentCart || [], // '장소보관함' 컬럼 초기화
    };

    if (travelDays) {
      const days = parseInt(travelDays, 10);
      for (let i = 1; i <= days; i++) {
        initialColumns[`Day ${i}`] = boardState.columns[`Day ${i}`] || [];
      }
    }

    setColumns(initialColumns);

    const newBoard: Board = {
      columns: initialColumns,
      ordered: Object.keys(initialColumns),
    };

    // 보드 상태 초기화
    dispatch({ type: 'SET_TASKS', payload: newBoard });
  }, [dispatch, boardState.columns, currentCart]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log('onDragEnd called', result); // 함수가 호출되는지 확인
      console.log('Source:', result.source);
      console.log('Destination:', result.destination);

      if (!result.destination) return;

      const source: DraggableLocation = result.source;
      const destination: DraggableLocation = result.destination;

      if (result.type === 'COLUMN') {
        console.log('Moving column from', source.index, 'to', destination.index);
        dispatch({ type: 'MOVE_COLUMN', payload: { source, destination } });
        return;
      }

      if (result.type === 'TASK') {
        dispatch({ type: 'MOVE_TASK', payload: { source, destination } });
      }
    },
    [dispatch]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='dashboard' type='COLUMN' direction='horizontal'>
        {(provided, snapshot) => (
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
            {Object.keys(columns).map((key, index) => (
              <Column key={key} index={index} listTitle={key} listOfTasks={columns[key]} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
