// Chakra imports
import {
  Flex,
  Text,
  useColorModeValue,
  Button,
  Spacer,
  Skeleton,
  Grid,
  Badge,
  Code,
  Checkbox,
  useToast
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card.js'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from 'variables/api'

const PERM_LABELS = {
  'user:login': '登录',
  'user:list': '查看用户列表',
  'user:manage': '管理用户',
  'data:visits': '查看访问量数据',
  'data:isp': '查看运营商数据',
  'data:os': '查看操作系统分布数据',
  'data:geo': '查看地理位置分布数据',
  'data:browser': '查看浏览器分布数据',
  'data:status_code': '查看状态码分布数据',
  'data:uri': '查看 URI 分布数据',
  'service:list': '查看服务列表',
  'service:log': '查看服务日志',
  'service:restart': '重启服务',
  'role:list': '查看角色列表',
  'role:update': '管理角色权限',
};

function fetchMatrix() {
  return api.get('role/list').json().then(({ data }) => data);
}

// Assets
export default function PermMatrix(props) {
  const { ...rest } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const bg = useColorModeValue('white', 'navy.700')

  const [submitting, setSubmitting] = React.useState(false);
  const [submitCount, setSubmitCount] = React.useState(0);
  const [changedRoles, setChangedRoles] = React.useState([]);
  const [mask, setMask] = React.useState({});
  const { data, isLoading, remove } = useQuery({
    queryKey: ['fetchPermMatrix', submitCount],
    queryFn: fetchMatrix,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const toast = useToast();

  const templateColumns = (data?.roles instanceof Array) ? Array(data.roles.length + 2).fill('1fr').join(' ') : '1fr';

  const handleChange = (role_id, perm_id) => {
    const newMask = { ...mask };
    if (newMask[role_id] === undefined) {
      newMask[role_id] = [];
    }
    if (newMask[role_id].includes(perm_id)) {
      newMask[role_id] = newMask[role_id].filter((id) => id !== perm_id);
    } else {
      newMask[role_id].push(perm_id);
    }
    if (newMask[role_id].length === 0) {
      setChangedRoles(changedRoles.filter((id) => id !== role_id));
    } else if (!changedRoles.includes(role_id)) {
      setChangedRoles([...changedRoles, role_id]);
    }
    setMask(newMask);
  };

  const resetChanges = () => {
    setChangedRoles([]);
    setMask({});
  }

  const handleSubmit = () => {
    if (submitting) {
      return;
    }
    if (changedRoles.length === 0) {
      toast({
        title: '提示',
        description: '没有检测到变更，无需保存',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setSubmitting(true);

    api.post('role/update', {
      json: {
        data: changedRoles.map((id) => {
          const newPerm = [...data.roles.find((role) => role.id === id).permissions];
          if (mask[id] instanceof Array) {
            mask[id].forEach((perm_id) => {
              const idx = newPerm.indexOf(perm_id);
              if (idx !== -1) {
                newPerm.splice(idx, 1);
              } else {
                newPerm.push(perm_id);
              }
            });
          }
          return {
            id,
            permissions: newPerm,
          }
        }),
      },
    }).then(() => {
      resetChanges();
      toast({
        title: '提示',
        description: '角色权限更新成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setSubmitCount(submitCount + 1);
      remove();
      setSubmitting(false);
    });
  }

  const disabled = submitting || isLoading;

  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
      <Flex direction='row'>
        <Flex>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mt='10px'
            mb='20px'
            alignSelf='flex-start'
          >
            角色权限分配
          </Text>
        </Flex>
        <Spacer />
        <Flex alignSelf='flex-end' my='auto' py='auto'>
          <Button mx='5px' colorScheme='red' onClick={resetChanges} isDisabled={disabled}>复位修改</Button>
          <Button variant='brand' onClick={handleSubmit} isDisabled={disabled}>保存修改</Button>
        </Flex>
      </Flex>

      <Flex w='100%' overflowX='auto' direction='column' minH='80%'>
        {isLoading ? <Skeleton h="200px" /> : (<>
          <Card bg='brand.500'>
            <Grid templateColumns={templateColumns}>
              <div />
              <div />
              {data.roles.map((role) => (
                <Badge key={role.id} colorScheme='blue' whiteSpace='normal' textAlign='center' mx='auto' w='80%'>
                  {role.name}
                </Badge>
              ))}
            </Grid>
          </Card>
          {data.permissions.map((perm) => (
            <Card bg={bg} key={perm.id}>
              <Grid templateColumns={templateColumns}>
                <Text
                  color={textColorPrimary}
                  fontWeight='550'
                  fontSize='md'
                  mx='3px'
                  my='auto'
                >
                  <Code>{perm.name}</Code>
                </Text>
                <Text
                  fontWeight='550'
                  color={textColorSecondary}
                  fontSize='md'
                  mx='3px'
                  my='auto'
                >
                  {PERM_LABELS[perm.name]}
                </Text>
                {/* <Checkbox defaultChecked={check} mx='auto' /> */}
                {data.roles.map((role) => (
                  <Checkbox
                    key={role.id}
                    isDisabled={disabled}
                    isChecked={role.permissions.includes(perm.id) ^ (mask[role.id] || []).includes(perm.id)}
                    onChange={() => handleChange(role.id, perm.id)}
                    mx='auto'
                  />
                ))}
              </Grid>
            </Card>
          ))}
        </>)}
      </Flex>
    </Card>
  )
}
