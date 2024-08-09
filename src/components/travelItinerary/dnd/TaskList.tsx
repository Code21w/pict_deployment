// TaskList.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/app/travelItinery/types';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TaskItem from '@/components/travelItinerary/dnd/TaskItem';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // eslint-disable-line no-unused-vars

type TaskListProps = {
  listTitle: string;
  listId?: string;
  listType?: string;
  listOfTasks: Task[];
  isDropDisabled?: boolean;
};

export default function TaskList({
  listTitle,
  listOfTasks,
  isDropDisabled,
  listId = 'LIST',
  listType,
}: TaskListProps) {
  const router = useRouter();

  return (
    <Droppable droppableId={listId} type={listType} isDropDisabled={isDropDisabled}>
      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
        console.log('Droppable provided:', dropProvided);
        console.log('Droppable snapshot:', dropSnapshot);

        return (
          <Card // eslint-disable-line no-unused-vars
            {...dropProvided.droppableProps}
            style={{
              margin: '0 4px',
              minWidth: '300px',
              maxWidth: '300px',
            }}
          >
            <CardHeader className='h-20 flex flex-row justify-between text-xl font-bold'>
              {listTitle}
              {listTitle === '장소보관함' && (
                <Button
                  variant={'secondary'}
                  className=' transform hover:scale-105 active:scale-95 transition-transform duration-200'
                  onClick={() => router.push('/travelplan')}
                >
                  장소추가
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <InnerList listOfTasks={listOfTasks} dropProvided={dropProvided} title={listTitle} />
            </CardContent>
          </Card>
        );
      }}
    </Droppable>
  );
}

type InnerListProps = {
  dropProvided: DroppableProvided;
  listOfTasks: Task[];
  title?: string;
};

function InnerList({ title, listOfTasks, dropProvided }: InnerListProps) {
  console.log('InnerList rendered with tasks:', listOfTasks);

  return (
    // eslint-disable-line no-unused-vars
    <div ref={dropProvided.innerRef} className='grid grid-cols-1 gap-3'>
      {listOfTasks.map((task, index) => {
        return (
          <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
            {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => {
              console.log('Draggable provided:', dragProvided);
              console.log('Draggable snapshot:', dragSnapshot);

              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  provided={dragProvided}
                  isDragging={dragSnapshot.isDragging}
                />
              );
            }}
          </Draggable>
        );
      })}
      {dropProvided.placeholder}
    </div>
  );
}
