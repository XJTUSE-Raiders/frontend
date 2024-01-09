import React, { useEffect } from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// Custom components
// import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  // const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  // const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [currentRole, setCurrentRole] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()

  const history = useHistory();

  const {
    roleList,
    // activeRole,
    isAuthenticated,
    isReady,
    login,
    selectRole,
    // logout
  } = useAuth();

  useEffect(() => {
    if (isReady) {
      history.replace("/admin");
      return;
    }
    if (isAuthenticated) {
      onOpen();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowClick = () => setShow(!show);

  const handleLogin = () => {
    if (user === '' || password === '') {
      toast({
        title: "错误",
        description: "用户名和密码均不能为空！",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (loading) return;
    setLoading(true);
    login(user, password).then((roles) => {
      setLoading(false);
      toast({
        description: "登陆成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setCurrentRole(roles[0]);
      if (roles.length > 1) {
        onOpen();
        return;
      }
      history.replace("/admin");
    }).catch((e) => {
      toast({
        title: "登录失败",
        description: "用户名或密码错误",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    });
  };

  const handleSelectRole = () => {
    if (loading) return;
    setLoading(true);
    selectRole(currentRole).then(() => {
      setLoading(false);
      onClose();
      toast({
        description: "选择角色成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      history.replace("/admin");
    }).catch((e) => {
      toast({
        title: "选择角色失败",
        description: e?.message ?? "未知错误",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    });
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "30px", md: "16vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            登录
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            数据驱动的智能网站访问分析平台
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              用户名<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='text'
              placeholder='请输入用户名'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={user}
              onChange={(e) => setUser(e.target.value)}
              isDisabled={loading}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              密码<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                placeholder='请输入密码'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isDisabled={loading}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleShowClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px' />
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={handleLogin}
              isLoading={loading}
            >
              登录
            </Button>
          </FormControl>
        </Flex>
      </Flex>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleSelectRole}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>选择角色</ModalHeader>
          <ModalBody>
            <Select value={currentRole} size="lg" onChange={(e) => setCurrentRole(e.target.value)}>
              {roleList.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSelectRole} isLoading={loading}>
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DefaultAuth>
  );
}

export default SignIn;
