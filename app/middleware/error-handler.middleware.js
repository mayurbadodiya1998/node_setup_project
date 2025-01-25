const errorHandler = (err, req, res, next) => {
    // Default status to 500 if not provided
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
  
    // Log the error for debugging
    console.error(err);
  
    // Send a structured error response
    res.status(status).json({
      error: {
        message,
        status,
      },
    });
  };
  
  export default errorHandler;
  