import { useState, useCallback, useRef } from 'react';

const useUndoRedo = (initialState, maxHistory = 50) => {
  const [currentState, setCurrentState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isUndoRedoAction = useRef(false);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const updateState = useCallback((newState) => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    setCurrentState(newState);
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, currentIndex + 1);
    
    // Add new state to history
    const updatedHistory = [...newHistory, newState];
    
    // Limit history size
    if (updatedHistory.length > maxHistory) {
      updatedHistory.shift();
    }
    
    setHistory(updatedHistory);
    setCurrentIndex(updatedHistory.length - 1);
  }, [history, currentIndex, maxHistory]);

  const undo = useCallback(() => {
    if (!canUndo) return;
    
    isUndoRedoAction.current = true;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentState(history[newIndex]);
  }, [canUndo, currentIndex, history]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    
    isUndoRedoAction.current = true;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentState(history[newIndex]);
  }, [canRedo, currentIndex, history]);

  const reset = useCallback((newInitialState) => {
    const initialState = newInitialState || initialState;
    setCurrentState(initialState);
    setHistory([initialState]);
    setCurrentIndex(0);
  }, [initialState]);

  return {
    state: currentState,
    updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    historyLength: history.length,
    currentIndex
  };
};

export default useUndoRedo; 