import React from 'react'
const Label = ({labels}) => {
  // labels coming back from go backend as one long string - split then map
  let newLabels = labels.split(' ')
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
