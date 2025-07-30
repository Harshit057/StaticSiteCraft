import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { safeLocalStorage, safeAsyncOperation } from '../utils/errorHandler';

const EditorContext = createContext();

const initialState = {
  selectedTemplate: null,
  selectedTheme: 'light',
  content: {},
  previewMode: 'desktop',
  isPreviewVisible: true,
  isDirty: false,
  lastSaved: null,
  autoSaveEnabled: true,
};

const editorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload,
        content: action.payload.defaultContent || {},
        isDirty: true,
      };
    case 'SET_THEME':
      return {
        ...state,
        selectedTheme: action.payload,
        isDirty: true,
      };
    case 'UPDATE_CONTENT':
      return {
        ...state,
        content: {
          ...state.content,
          ...action.payload,
        },
        isDirty: true,
      };
    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        previewMode: action.payload,
      };
    case 'TOGGLE_PREVIEW':
      return {
        ...state,
        isPreviewVisible: !state.isPreviewVisible,
      };
    case 'SET_DIRTY':
      return {
        ...state,
        isDirty: action.payload,
      };
    case 'SET_LAST_SAVED':
      return {
        ...state,
        lastSaved: action.payload,
        isDirty: false,
      };
    case 'TOGGLE_AUTO_SAVE':
      return {
        ...state,
        autoSaveEnabled: !state.autoSaveEnabled,
      };
    case 'RESET_EDITOR':
      return {
        ...initialState,
        autoSaveEnabled: state.autoSaveEnabled,
      };
    default:
      return state;
  }
};

// Debounce utility to prevent excessive saves
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const saveTimeoutRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const savedState = safeLocalStorage.get('editorState');
        if (savedState && typeof savedState === 'object') {
          // Only restore non-null values to avoid overwriting with null
          Object.keys(savedState).forEach(key => {
            if (savedState[key] !== null && savedState[key] !== undefined) {
              if (key === 'selectedTemplate' && savedState[key]) {
                // Validate template exists before restoring
                dispatch({ type: 'SET_TEMPLATE', payload: savedState[key] });
              } else if (key === 'selectedTheme') {
                dispatch({ type: 'SET_THEME', payload: savedState[key] });
              } else if (key === 'content' && savedState[key]) {
                dispatch({ type: 'UPDATE_CONTENT', payload: savedState[key] });
              } else if (key === 'previewMode') {
                dispatch({ type: 'SET_PREVIEW_MODE', payload: savedState[key] });
              } else if (key === 'isPreviewVisible') {
                dispatch({ type: 'TOGGLE_PREVIEW' });
              }
            }
          });
        }
      } catch (error) {
        console.warn('Failed to load saved state:', error);
      } finally {
        isInitializedRef.current = true;
      }
    };

    loadSavedState();
  }, []);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (stateToSave) => {
      if (!stateToSave.autoSaveEnabled) return;

      try {
        // Only save essential data to prevent localStorage abuse
        const dataToSave = {
          selectedTemplate: stateToSave.selectedTemplate,
          selectedTheme: stateToSave.selectedTheme,
          content: stateToSave.content,
          previewMode: stateToSave.previewMode,
          isPreviewVisible: stateToSave.isPreviewVisible,
          autoSaveEnabled: stateToSave.autoSaveEnabled,
        };

        // Check localStorage size before saving
        const dataSize = JSON.stringify(dataToSave).length;
        const maxSize = 5 * 1024 * 1024; // 5MB limit

        if (dataSize > maxSize) {
          console.warn('State too large to save, clearing old data');
          // Clear old data and try again
          safeLocalStorage.remove('editorState');
        }

        const success = safeLocalStorage.set('editorState', dataToSave);
        if (success) {
          dispatch({ type: 'SET_LAST_SAVED', payload: new Date().toISOString() });
        }
      } catch (error) {
        console.warn('Failed to save state:', error);
      }
    }, 1000), // 1 second debounce
    []
  );

  // Auto-save on state changes
  useEffect(() => {
    if (!isInitializedRef.current) return; // Don't save during initial load

    if (state.isDirty && state.autoSaveEnabled) {
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Set new timeout
      saveTimeoutRef.current = setTimeout(() => {
        debouncedSave(state);
      }, 1000);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state, debouncedSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const value = {
    state,
    dispatch,
    setTemplate: (template) => dispatch({ type: 'SET_TEMPLATE', payload: template }),
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    updateContent: (content) => dispatch({ type: 'UPDATE_CONTENT', payload: content }),
    setPreviewMode: (mode) => dispatch({ type: 'SET_PREVIEW_MODE', payload: mode }),
    togglePreview: () => dispatch({ type: 'TOGGLE_PREVIEW' }),
    toggleAutoSave: () => dispatch({ type: 'TOGGLE_AUTO_SAVE' }),
    resetEditor: () => dispatch({ type: 'RESET_EDITOR' }),
    saveState: () => debouncedSave(state),
    clearSavedState: () => {
      safeLocalStorage.remove('editorState');
      dispatch({ type: 'SET_LAST_SAVED', payload: null });
    },
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}; 