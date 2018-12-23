import React from 'react'

const Body = ({body}) =>  {
  const style = {
    "margin": "1% 0 1% 5%",
    "padding": "2%"
  }

  return <div style={style}>{body}</div>
}
  
export default Body