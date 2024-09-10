import React from 'react'

const Background = ({children}) => {
  return (
    <div className="w-full h-dvh bg-[linear-gradient(_purple_0%,_black_30%,black_75%,_purple_100%)]">
{children}
    </div>
  )
}

export default Background