'use client';
import { useCartStore } from '@/store/store';
import * as React from 'react';

import { Board, BoardAction } from '@/app/travelItinery/types';

const boardInitialState: Board = {
  columns: {
    장소보관함: [],
  },
  ordered: ['장소보관함'],
};

const BoardContext = React.createContext({
  boardState: boardInitialState,
  dispatch: (action: BoardAction) => {},
});

export const BoardProvider = ({ children }: React.PropsWithChildren) => {
  const [boardState, dispatch] = React.useReducer(boardReducer, boardInitialState);
  const [loading, setLoading] = React.useState(true);
  const currentCart = useCartStore((state) => state.currentCart);

  React.useEffect(() => {
    loadData();
  }, [currentCart]);

  function loadData() {
    const sessionBoardData = sessionStorage.getItem('@Board');

    if (sessionBoardData === null) {
      const newBoardState: Board = {
        ...boardInitialState,
        columns: {
          ...boardInitialState.columns,
          장소보관함: currentCart,
        },
      };
      sessionStorage.setItem('@Board', JSON.stringify(newBoardState));
      dispatch({ type: 'SET_TASKS', payload: newBoardState });
    } else {
      const dataObject = JSON.parse(sessionBoardData);
      dispatch({ type: 'SET_TASKS', payload: dataObject });
    }
    setLoading(false);
  }
  return <div>{children}</div>;
};

/**
 * custom hook for easy context usage :)
 */
export function useBoard() {
  return React.useContext(BoardContext);
}

/**
 * Tasks reducer
 * This function handles actions on the state
 */

function boardReducer(state: Board, action: BoardAction): Board {
  switch (action.type) {
    case 'SET_TASKS': {
      return action.payload;
    }
    case 'MOVE_COLUMN': {
      const result = [...state.ordered];
      const [removed] = result.splice(action.payload.source.index, 1);
      result.splice(action.payload.destination.index, 0, removed);

      const newState = { ...state, ordered: result };

      sessionStorage.setItem('@Board', JSON.stringify(newState));
      return newState;
    }
    case 'MOVE_TASK': {
      if (action.payload.source.droppableId === action.payload.destination.droppableId) {
        const reorderedTasks = [...state.columns[action.payload.source.droppableId]];
        const [movedTask] = reorderedTasks.splice(action.payload.source.index, 1);
        reorderedTasks.splice(action.payload.destination.index, 0, movedTask);

        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [action.payload.source.droppableId]: reorderedTasks,
          },
        };

        sessionStorage.setItem('@Board', JSON.stringify(newState));

        return newState;
      }

      const startTasks = [...state.columns[action.payload.source.droppableId]];
      const finishTasks = [...state.columns[action.payload.destination.droppableId]];
      const [removedTask] = startTasks.splice(action.payload.source.index, 1);
      finishTasks.splice(action.payload.destination.index, 0, removedTask);

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.source.droppableId]: startTasks,
          [action.payload.destination.droppableId]: finishTasks,
        },
      };

      sessionStorage.setItem('@Board', JSON.stringify(newState));

      return newState;
    }
    case 'ADD_TASK': {
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          ['Pending']: [action.payload, ...state.columns.Pending],
        },
      };

      sessionStorage.setItem('@Board', JSON.stringify(newState));

      return newState;
    }
    case 'REMOVE_TASK': {
      const taskToRemoveId = action.payload.id;
      const newState = { ...state };

      for (const column of Object.keys(state.columns)) {
        newState.columns[column] = newState.columns[column].filter(
          (task) => task.id !== taskToRemoveId
        );
      }

      sessionStorage.setItem('@Board', JSON.stringify(newState));

      return newState;
    }
    default: {
      return boardInitialState;
    }
  }
}
