import React from 'react'
import { Menu } from 'antd';
import MenuItem from './MenuItem'
import { COLOR_SLATE, COLOR_CERAMIC, COLOR_LATTE, COLOR_COFFEE } from '../constants'



const dropMenuStyle = {
  borderWight: 2,
  borderColor: '#fff',
  borderRadius: 15,
  backgroundColor: COLOR_SLATE,
  color: '#fff',
  // margin: 10,
  
}



const DropdownMenu = (props)=>{
  
  const { maj, list, proprety, name, selected } = props
  
  const menuItemInStyle={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: COLOR_LATTE,
    // margin: 10,
  }  
  const menuItemOutStyle={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    // margin: 10,
  }  
  console.log('selected=', selected)

    return (
      <Menu
      style={dropMenuStyle}
      >
        { list.map( (item, i) =>{
          return (
            <Menu.Item 
            style={
              {borderRadius: 15, backgroundColor: selected === item[proprety] ? COLOR_CERAMIC : COLOR_SLATE }
            }
            key={i} onClick={() => maj(item[proprety])} 
            >

                <MenuItem
                item={item}
                name={name}
                styleIn={menuItemInStyle}
                styleOut={menuItemOutStyle}
                />

            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
  
export default DropdownMenu
