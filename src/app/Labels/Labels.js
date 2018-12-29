import React from 'react'
const Label = ({labels}) => {
  // labels coming back from go backend as one long string - split then map
  let newLabels = [];
  let newLabelsFromObj;
  if (typeof labels === 'string') {
  newLabels = labels.split(' ')
  } else if (typeof labels === 'object') {
    
    newLabelsFromObj = `"${labels[0]}"}"`
    newLabels.push(newLabelsFromObj)
  }
  let labelsArray = []
  newLabels.forEach((label) => {
      if (label.includes('personal')) {
        labelsArray.push('personal')
      }
      if (label.includes('dev')) {
        labelsArray.push('dev')
      }
    if (label.includes('gschool')) {
      labelsArray.push('gschool')
    }
  })
  
  return labelsArray.map((label, id) => <span className="label label-warning" key={id} >{label}</span>)}
export default Label
