import React from 'react'

const ErrorMessage = ({message}: {message: string}) => {
    if (!message)
        return
  return (
    <p className='w-full bg-transparent text-sm text-center text-red-500'>{message}</p>
  )
}

export default ErrorMessage
