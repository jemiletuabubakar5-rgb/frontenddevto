api.interceptors.response.use(
  response => response,
  error => {
    const { response, config } = error;
    
    if (response) {
      switch (response.status) {
        case 401:
          toast.error('Please login again');
          // Handle logout or token refresh
          break;
        case 403:
          toast.error('You are not authorized');
          break;
        case 500:
          console.error('Server Error:', {
            url: config.url,
            status: response.status,
            data: response.data
          });
          toast.error('Server error occurred. Please try again later.');
          break;
        default:
          toast.error(`Error: ${response.statusText}`);
      }
    } else {
      toast.error('Network error - please check your connection');
    }
    
    return Promise.reject(error);
  }
);


const safeParseDate = (dateInput) => {
  // Handle cases where input is null/undefined
  if (!dateInput) return new Date();
  
  // If it's already a Date object
  if (dateInput instanceof Date) return dateInput;
  
  // If it's a number (timestamp)
  if (typeof dateInput === 'number') return new Date(dateInput);
  
  // If it's a MongoDB ObjectID (24 hex chars)
  if (typeof dateInput === 'string' && /^[0-9a-fA-F]{24}$/.test(dateInput)) {
    try {
      // Extract timestamp from ObjectID (first 4 bytes)
      const timestamp = parseInt(dateInput.substring(0, 8), 16) * 1000;
      return new Date(timestamp);
    } catch {
      return new Date();
    }
  }
  
  // Try ISO string parsing
  try {
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? new Date() : date;
  } catch {
    return new Date();
  }
};