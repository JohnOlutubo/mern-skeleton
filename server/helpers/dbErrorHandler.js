// Define a function called getErrorMessage that takes an error object as input and returns a string message based on the type of error
const getErrorMessage = (err) => {
  // Initialize an empty string to store the error message
  let message = ''

  // If the error object has a 'code' property, it is a MongoDB error
  if (err.code) {
    // Use a switch statement to check if the error code is either 11000 or 11001
    switch (err.code) {
      // If the error code is a duplicate key error, call another function to generate an appropriate error message
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err)
        break
      // If the error code is not a duplicate key error, set the message to 'Something went wrong'
      default:
        message = 'Something went wrong'
    }
  } 
  // If the error object does not have a 'code' property, it means it is a Mongoose validation error
  else {
    // Loop through each error in the 'errors' property of the error object
    for (let errName in err.errors) {
      // If there is a 'message' property for the error, set the message to that error message
      if (err.errors[errName].message)
        message = err.errors[errName].message
    }
  }
  // Return the generated error message as a string
  return message
}



// add another function that takes an error object as input and generates an appropriate error message
const getUniqueErrorMessage = (err) => {
  let output
  try { // try to extract field name from error message
    let fieldName = err.message.substring(
      err.message.lastIndexOf('.$') + 2, // get index of start of field name
      err.message.lastIndexOf('_1') // get index of end of field name
    )
    // format field name to start with uppercase letter and end with "already exists"
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
  } catch (ex) { // if error occurs while extracting field name, use default error message
    output = 'Unique field already exists'
  }
  return output // return generated error message as a string
}


export default { getErrorMessage }
