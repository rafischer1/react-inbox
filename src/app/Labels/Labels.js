import React from 'react'
const Label = ({labels}) => {
  if (labels === undefined) {
    return false
  }
  return labels.map((label, id) => <span className="label label-warning" key={id} >{label}</span>)}
export default Label