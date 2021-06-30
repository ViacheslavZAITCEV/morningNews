import React from 'react'
import { Dropdown, Button } from 'antd';

export default function DropDownButton(props) {

  const {dropdown, title, titleItem, image} = props

  const dropdownStyle= {
    background: '#001529',
    color: '#fff',
    borderRadius: 15,
    margin: 15,
    "&:hover":{
      color: '#1890ff',
    }
  }

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