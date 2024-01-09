// Chakra imports
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text
} from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'
import { React, useState } from 'react'
import { MdOutlineCalendarToday } from 'react-icons/md'

export function CalendarButton (props) {

  const [menu, setMenu] = useState('Realtime')

  // Chakra Color Mode

  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<MdArrowDropDown />}
        bg={boxBg}
        fontSize='sm'
        fontWeight='500'
        color={textColorSecondary}
        borderRadius='7px'
        onClick={e => {e.stopPropagation()}}
      >
        <Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
        {menu}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={e => {
            e.stopPropagation();
            setMenu('Realtime')
          }}
        >
          Realtime
        </MenuItem>
        <MenuItem
          onClick={e => {
            e.stopPropagation();
            setMenu('Today')
          }}
        >
          Today
        </MenuItem>
        <MenuItem
          onClick={e => {
            e.stopPropagation();
            setMenu('This Week')
          }}
        >
          This Week
        </MenuItem>
        <MenuItem
          onClick={e => {
            e.stopPropagation();
            setMenu('This Month')
          }}
        >
          This Month
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
