class CustomError extends Error {
  constructor(message, status) {
    super(message); // Call the parent class constructor (Error)
    this.status = status; // Add a custom status code
    this.name = this.constructor.name; // Set the error name
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
  }
}

export default CustomError; // Use export default for ES modules
