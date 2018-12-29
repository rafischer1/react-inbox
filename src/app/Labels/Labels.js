import React from 'react'
const Label = ({labels}) => {
  console.log("lables first time:", typeof labels);
  // labels coming back from go backend as one long string - split then map
  let newLabels = [];
  let newLabelsFromObj;
  if (typeof labels === 'string') {
  newLabels = labels.split(' ')
  } else if (typeof labels === 'object') {
    
    newLabelsFromObj = `"${labels[0]}"}"`
    console.log("newLabelsFromObj:", newLabelsFromObj)
    newLabels.push(newLabelsFromObj)
  }
  console.log("newLabels [] after both ifs", newLabels);
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
  console.log("in labels.js:", labelsArray)
  
  return labelsArray.map((label, id) => <span className="label label-warning" key={id} >{label}</span>)}
export default Label
