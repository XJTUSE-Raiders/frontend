import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Flex,
  Spacer,
  Select
} from '@chakra-ui/react'
import React from 'react'

// Custom components
import Card from 'components/card/Card'
export default function ColumnsTable () {

  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <FormControl>
        <Flex direction='row' my={5}>
          <Flex direction='column' mx={3} w='40%'>
            <FormLabel>用户名称</FormLabel>
            <Input type='username'></Input>
            <FormHelperText>不能和其他用户重复</FormHelperText>
          </Flex>
          <Spacer></Spacer>
          <Flex direction='column' mx={3} w='40%'>
            <FormLabel>用户密码</FormLabel>
            <Input type='password'></Input>
            <FormHelperText>请设置较强的密码</FormHelperText>
          </Flex>
        </Flex>
        <Flex direction='row' my={5}>
          <Flex direction='column' mx={3} w='40%'>
            <FormLabel>角色划分</FormLabel>
            <Select placeholder='选择角色'>
              <option>访客</option>
              <option>用户</option>
              <option>前台管理员</option>
              <option>后台管理员</option>
            </Select>
          </Flex>
        </Flex>
      </FormControl>
    </Card>
  )
}
