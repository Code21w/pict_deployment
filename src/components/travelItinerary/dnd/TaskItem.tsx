// components/TaskItem.tsx
import * as React from 'react';
import {
  Card,
  CardContent, // eslint-disable-line no-unused-vars
  CardDescription, // eslint-disable-line no-unused-vars
  CardFooter, // eslint-disable-line no-unused-vars
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Task } from '@/app/travelItinery/types';
import { DraggableProvided } from 'react-beautiful-dnd';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/drop-down-menu';
import { useBoard } from '@/components/travelItinerary/dnd/BoardContext';

const DEFAULT_IMAGE = '/assets/PicT01.png';

type TaskItemProps = {
  task: Task;
  isDragging: boolean;
  provided: DraggableProvided;
};

function TaskItem({ isDragging, provided, task }: TaskItemProps) {
  const { dispatch } = useBoard();
  return (
    <li
      className='relative'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Card className={cn(isDragging ? 'bg-slate-50' : '')}>
        <CardHeader className='pb-3'>
          <div className='flex justify-between'>
            <CardTitle>
              {task.firstimage && (
                <img
                  src={task.firstimage || DEFAULT_IMAGE}
                  alt={task.title}
                  className='h-8 w-8 mr-3 inline-block' // 이미지 크기와 간격 조정
                />
              )}
              {task.title}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'outline'}
                  size={'icon'}
                  className='absolute right-5 top-5 h-6 w-6'
                >
                  <DotsHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button
                  variant='ghost'
                  className='w-full justify-between hover:text-red-500 hover:bg-red-50'
                  onClick={() => {
                    console.log('Delete button clicked'); // 로그 추가
                    dispatch({ type: 'REMOVE_TASK', payload: { id: task.id } });
                  }}
                >
                  Delete <TrashIcon className='h-[1.2rem] w-[1.2rem]' />
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        {/* <CardFooter className="flex justify-between">
        </CardFooter> */}
      </Card>
    </li>
  );
}

export default React.memo<TaskItemProps>(TaskItem);
