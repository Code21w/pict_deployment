// components/Column.tsx

import { Task } from '@/app/travelItinery/types';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import TaskList from '@/components/travelItinerary/dnd/TaskList';

type ColumnProps = {
  listTitle: string;
  listOfTasks: Task[];
  index: number;
};

export default function Column({ index, listOfTasks, listTitle }: ColumnProps) {
  return (
    <Draggable draggableId={listTitle} index={index}>
      {(
        provided: DraggableProvided,
        snapshot: DraggableStateSnapshot // eslint-disable-line no-unused-vars
      ) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <TaskList
            listId={listTitle}
            listType='TASK'
            listOfTasks={listOfTasks}
            isDropDisabled={false}
            listTitle={listTitle}
          />
        </div>
      )}
    </Draggable>
  );
}
