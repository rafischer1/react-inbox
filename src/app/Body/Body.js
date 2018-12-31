import React from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'


const Body = ({body}) =>  {
  return <span class="messagesBody">
    <DropdownButton bsStyle="default right" bsSize="small" title="Message" noCaret id="dropdown-no-caret">
      <MenuItem divider />
             <span class="readBody" eventKey="2">{body}</span>
           </DropdownButton>
         </span>;
}
  
export default Body