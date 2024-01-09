import {
  Flex,
  Switch,
  FormControl,
  FormLabel,
  useColorModeValue,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'

export default function ModeSwitch (props) {
  const textColor = useColorModeValue('navy.700', 'white')
  const [trafficMode, setTrafficMode] = useState(false)
  function checkStatus (mode) {
    setTrafficMode(!mode)
    console.log(trafficMode)
  }
  return (
    <Flex align='center' mb={2}>
      <FormControl display='flex' alignItems='center' onClick={e => {
            e.stopPropagation();
            checkStatus(trafficMode)
          }}>
        <FormLabel htmlFor='traffic' mb='0' color>
          <Text color={textColor} size='sm' fontWeight='bold'>
            Visits
          </Text>
        </FormLabel>
        <Switch
          isChecked={trafficMode}
          id='traffic'

        />
        <FormLabel htmlFor='traffic' mb='0' ml={1}>
          <Text color={textColor} size='sm' fontWeight='bold'>
            Traffic
          </Text>
        </FormLabel>
      </FormControl>
    </Flex>
  )
}
