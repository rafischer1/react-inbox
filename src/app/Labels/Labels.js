import React from 'react'

const Label = ({labels}) => {
  return labels.map(label => <span className="label label-warning" >{label}</span>)}

export default Label