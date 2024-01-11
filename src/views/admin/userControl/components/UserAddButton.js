import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import UserModifyModal from 'views/admin/userControl/components/UserModifyModal'
import { Select } from "chakra-react-select"
import { api } from "variables/api";
import { useQuery } from "@tanstack/react-query";


function UserAddButton(props) {
  const { children, onSubmit, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: roles, isLoading } = useQuery({
    queryKey: ['fetchUserRoles'],
    queryFn: () => api.get('user/roles').json()
      .then(({ roles }) => roles.map((role) => ({ value: role, label: role }))),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSave = (data) => {
    if (submitting) return;
    if (username === '') {
      toast({
        title: '错误',
        description: '用户名不能为空',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (password === '') {
      toast({
        title: '错误',
        description: '密码不能为空',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (email === '') {
      toast({
        title: '错误',
        description: '邮箱不能为空',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (phone === '') {
      toast({
        title: '错误',
        description: '电话号码不能为空',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (selectedRoles.length === 0) {
      toast({
        title: '错误',
        description: '角色不能为空',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setSubmitting(true);

    api.post('user/create', {
      json: {
        username,
        password,
        email,
        phone,
        roles: selectedRoles.map((role) => role.value),
      }
    }).then(() => {
      setSubmitting(false);
      onClose();
      toast({
        title: '成功',
        description: '用户创建成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onSubmit?.();
    }).catch((err) => {
      setSubmitting(false);
      toast({
        title: '错误',
        description: `请检查用户名冲突和输入合法性 (${err.message})`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  }

  return (
    <Button {...rest} onClick={onOpen}>
      {children}
      <UserModifyModal
        modalTitle="增加用户"
        isOpen={isOpen}
        onOpen={onOpen}
        onSave={handleSave}
        onClose={onClose}
        isLoading={submitting}
      >
        <FormControl>
          <Flex direction='row' my={5}>
            <Flex direction='column' mx={3} w='50%'>
              <FormLabel>用户名</FormLabel>
              <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
              <FormHelperText>用户名必须唯一</FormHelperText>
            </Flex>
            <Flex direction='column' mx={3} w='50%'>
              <FormLabel>密码</FormLabel>
              <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <FormHelperText>设置较强的密码有助于系统安全</FormHelperText>
            </Flex>
          </Flex>
          <Flex direction='row' my={5}>
            <Flex direction='column' mx={3} w='50%'>
              <FormLabel>邮箱</FormLabel>
              <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <FormHelperText>邮箱必须唯一</FormHelperText>
            </Flex>
            <Flex direction='column' mx={3} w='50%'>
              <FormLabel>电话号码</FormLabel>
              <Input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <FormHelperText>电话号码必须唯一</FormHelperText>
            </Flex>
          </Flex>
          <Flex direction='row' my={5}>
            <Flex direction='column' mx={3} w='100%'>
              <FormLabel>角色</FormLabel>
              <Select
                isMulti
                isLoading={isLoading}
                loadingMessage={() => '正在加载角色列表...'}
                options={roles}
                closeMenuOnSelect={false}
                placeholder='选择角色'
                value={selectedRoles}
                onChange={(selected) => setSelectedRoles(selected)}
              />
            </Flex>
          </Flex>
        </FormControl>
      </UserModifyModal>
    </Button>
  );
}

export default UserAddButton;
