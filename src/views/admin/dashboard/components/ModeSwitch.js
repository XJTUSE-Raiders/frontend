import {
  Flex,
  Switch,
  FormControl,
  FormLabel,
  useColorModeValue,
  Text
} from '@chakra-ui/react'

export default function ModeSwitch (props) {
  const textColor = useColorModeValue('navy.700', 'white')
  const { isTraffic } = props
  return (
    <Flex align='center' mb={2}>
      <FormControl
        display='flex'
        alignItems='center'
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <FormLabel htmlFor='traffic' mb='0' color>
          <Text color={textColor} size='sm' fontWeight='bold'>Visits</Text>
        </FormLabel>
        <Switch isChecked={isTraffic} id='traffic' />
        <FormLabel htmlFor='traffic' mb='0' ml={1}>
        <Text color={textColor} size='sm' fontWeight='bold'>Traffic</Text>
        </FormLabel>
      </FormControl>
    </Flex>
  )
}
