import React from 'react'
import { Menu } from 'antd';

import { COLOR_SLATE, COLOR_LATTE, COLOR_COFFEE } from '../constants'



const dropMenuStyle = {
  borderWight: 2,
  borderColor: '#fff',
  borderRadius: 15,
  backgroundColor: COLOR_SLATE,
  color: '#fff'
}

const menuItemStyle={

}  


const DropdownMenu = (props)=>{

  const { maj, list, proprety, name } = props
  

    return (
      <Menu
      style={dropMenuStyle}
      >
        { list.map( (item, i) =>{
          return (
            <Menu.Item key={i} onClick={() => maj(item[proprety])} >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              >
                <span>
                  {item[name]}
                </span>
                {item.img &&
                  <span className="drapeau">
                    <img className="logos" src={ item.img } />
                  </span>
                }
              </div>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
  
export default DropdownMenu
