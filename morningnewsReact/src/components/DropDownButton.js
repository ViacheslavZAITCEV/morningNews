import React from 'react'
import { Dropdown, Button } from 'antd';

export default function DropDownButton(props) {

  const {dropdown, title, titleItem, image, dropdownStyle} = props

  return (    
    <Dropdown overlay={dropdown} >
      <Button style={dropdownStyle} >
        {title} - {titleItem ? titleItem : <span> All </span>} &nbsp;
        {image && 
          <img className="logos" alt='Country'
          src={ titleItem ? `/images/${titleItem}.png` : `/images/${image}.png` }
          />
        }
      </Button>
    </Dropdown>
  )
}