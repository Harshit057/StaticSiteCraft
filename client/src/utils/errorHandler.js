export class AppError extends Error {
  constructor(message, type = 'general', code = null, userMessage = null) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.code = code;
    this.userMessage = userMessage || message;
  }
}

export const handleError = (error, context = '') => {
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`Error in ${context}:`, error);
  }
  
  if (error instanceof AppError) {
    return {
      message: error.userMessage,
      type: error.type,
      code: error.code,
      technicalMessage: error.message
    };
  }
  
  // Handle common errors with user-friendly messages
  if (error.name === 'NetworkError' || error.message.includes('fetch')) {
    return {
      message: 'Unable to connect to the server. Please check your internet connection and try again.',
      type: 'network',
      code: 'NETWORK_ERROR',
      technicalMessage: error.message
    };
  }
  
  if (error.name === 'QuotaExceededError') {
    return {
      message: 'Your browser storage is full. Please clear some space and try again.',
      type: 'storage',
      code: 'QUOTA_EXCEEDED',
      technicalMessage: error.message
    };
  }

  if (error.name === 'TypeError' && error.message.includes('JSON')) {
    return {
      message: 'There was an issue with the data format. Please refresh the page and try again.',
      type: 'data',
      code: 'JSON_PARSE_ERROR',
      technicalMessage: error.message
    };
  }
  
  return {
    message: 'Something went wrong. Please try again or contact support if the problem persists.',
    type: 'unknown',
    code: 'UNKNOWN_ERROR',
    technicalMessage: error.message
  };
};

export const showErrorToast = (error, toastFunction) => {
  const { message, type } = handleError(error);
  
  if (toastFunction) {
    toastFunction(message, { type: 'error' });
  } else {
    // Fallback to alert if no toast function provided
    alert(`Error: ${message}`);
  }
};

export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxFiles = 1
  } = options;
  
  const errors = [];
  
  if (!file) {
    errors.push('Please select a file to upload');
    return { isValid: false, errors };
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not supported. Please use: ${allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError;
};

// New utility for handling async operations with proper error handling
export const safeAsyncOperation = async (operation, context = '') => {
  try {
    return await operation();
  } catch (error) {
    const handledError = handleError(error, context);
    throw new AppError(
      handledError.technicalMessage,
      handledError.type,
      handledError.code,
      handledError.message
    );
  }
};

// Utility for handling localStorage operations safely
export const safeLocalStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Failed to get localStorage item '${key}':`, error);
      }
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Failed to set localStorage item '${key}':`, error);
      }
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Failed to remove localStorage item '${key}':`, error);
      }
      return false;
    }
  }
}; 