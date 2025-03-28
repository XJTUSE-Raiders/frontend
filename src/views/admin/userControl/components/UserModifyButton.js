import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import UserModifyModal from 'views/admin/userControl/components/UserModifyModal'
import { Select } from "chakra-react-select"
import { api } from "variables/api";
import { useQuery } from "@tanstack/react-query";


function UserModifyButton(props) {
  const { children, initialData, onSubmit, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: roles, isLoading } = useQuery({
    queryKey: ['fetchUserRoles'],
    queryFn: () => api.get('user/roles').json()
      .then(({ roles }) => roles.map((role) => ({ value: role, label: role }))),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const toast = useToast();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRoles, setSelectedRoles] = useState(initialData.roles.map((role) => ({ value: role, label: role })));
  const [submitting, setSubmitting] = useState(false);

  const handleSave = (data) => {
    if (submitting) return;
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
    const newUser = { roles: selectedRoles.map((role) => role.value) };
    if (password !== '') {
      newUser.password = password;
    }
    if (email !== '') {
      newUser.email = email;
    }
    if (phone !== '') {
      newUser.phone = phone;
    }

    api.post('user/update', {
      json: {
        username: initialData.username,
        ...newUser,
      }
    }).then(() => {
      setSubmitting(false);
      onClose();
      toast({
        title: '成功',
        description: '修改用户成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onSubmit?.();
    }).catch((err) => {
      setSubmitting(false);
      toast({
        title: '错误',
        description: `请检查输入合法性 (${err.message})`,
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
        modalTitle="修改用户"
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
              <Input type='text' value={initialData.username} isReadOnly />
              <FormHelperText>用户名不可编辑</FormHelperText>
            </Flex>
            <Flex direction='column' mx={3} w='50%'>
              <FormLabel>密码</FormLabel>
              <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <FormHelperText>留空不修改</FormHelperText>
            </Flex>
          </Flex>
          <Flex direction='row' my={5}>
            <Flex direction='column' mx={3} w='50%'>
              <FormLabel>邮箱</FormLabel>
              <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <FormHelperText>邮箱必须唯一，留空不修改</FormHelperText>
            </Flex>
            <Flex direction='column' mx={3} w='50%'>
              <FormLabel>电话号码</FormLabel>
              <Input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <FormHelperText>电话号码必须唯一，留空不修改</FormHelperText>
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

export default UserModifyButton;
