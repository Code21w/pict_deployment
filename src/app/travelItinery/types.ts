import { DraggableLocation } from 'react-beautiful-dnd';

export type Task = {
  id: number;
  sigungu_id: number;
  title: string;
  firstimage: string;
  map_x: number;
  map_y: number;
  isChecked: boolean;

  // Optional fields
  addr1?: string;
  category?: string;
  place_id?: number;
  days?: number;
  planner_id?: string | null;
  sequence?: number;
};

export const initialTask: Task = {
  id: 0,
  place_id: undefined,
  title: '',
  days: undefined,
  firstimage: '',
  planner_id: null,
  sequence: undefined,
  map_x: 0,
  map_y: 0,
  sigungu_id: 0,
  isChecked: false,
  addr1: '', // 옵션
  category: '', // 옵션
};

export type TaskMap = {
  [key: string]: Task[];
};

export type Board = {
  columns: TaskMap;
  ordered: string[]; // 정렬 : 보드가 서로 바꼈을 때, 순서를 기억
};

export type BoardAction =
  | { type: 'SET_TASKS'; payload: Board }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: RemoveTaskPayload }
  | { type: 'MOVE_TASK'; payload: OnDragPayload }
  | { type: 'MOVE_COLUMN'; payload: OnDragPayload };

type OnDragPayload = {
  source: DraggableLocation;
  destination: DraggableLocation;
};

export type RemoveTaskPayload = {
  id: number;
};
