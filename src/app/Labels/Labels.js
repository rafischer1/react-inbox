import React from 'react'
const Label = ({labels}) => {
  return labels.map((label, idx) => <span className="label label-warning" key={idx} >{label}</span>)}
export default Label