import React from 'react'
const Label = ({labels}) => {
  // labels coming back from go backend as one long string - split then map
  console.log("labels:", labels, typeof labels)
  let labelsArray = []
  if (labels.includes(undefined)) {
        labels.replace(undefined, " ")
      }
      if (labels.includes('personal')) {
        labelsArray.push('personal')
      }
      if (labels.includes('dev')) {
        labelsArray.push('dev')
      }
      if (labels.includes('gschool')) {
      labelsArray.push('gschool')
      }
      

  
  return labelsArray.map((label, id) => <span className="label label-warning" key={id} >{label}</span>)}
export default Label
