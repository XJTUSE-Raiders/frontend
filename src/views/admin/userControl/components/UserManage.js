// Chakra imports
import {
  Checkbox,
  Flex,
  IconButton,
  Skeleton,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useMemo } from "react";
// Assets
import { MdOutlineRefresh } from "react-icons/md";
import UserModifyButton from "./UserModifyButton";
import DeleteButton from "./DeleteButton";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { api } from "variables/api";
import { useQuery } from "@tanstack/react-query";
import UserAddButton from "./UserAddButton";

export default function UserManage() {

  const fetchUserList = () => {
    return api.get('user/list').json().then(({ users }) => users);
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['fetchUserList'],
    queryFn: fetchUserList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const selectedCount = selectedUsers.length;
  const toast = useToast();

  const columns = useMemo(() => [
    {
      Header: "用户名",
      accessor: "username",
    },
    {
      Header: "角色",
      accessor: "roles",
    },
    {
      Header: "邮箱",
      accessor: "email",
    },
    {
      Header: "电话号码",
      accessor: "phone",
    }
  ], []);
  const computedData = useMemo(() => {
    if (!(data instanceof Array)) return [];
    return data;
  }, [data]);

  const tableInstance = useTable(
    {
      columns,
      data: computedData
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [submitting, setSubmitting] = React.useState(false);
  const disabled = isFetching || submitting;

  const handleRefresh = () => {
    if (disabled) return;
    setSelectedUsers([]);
    refetch();
  }

  const handleDelete = () => {
    if (disabled) return;
    setSubmitting(true);
    api.post('user/delete', {
      json: {
        users: selectedUsers,
      }
    }).json().then(() => {
      setSelectedUsers([]);
      refetch();
      setSubmitting(false);
      toast({
        title: '成功',
        description: '用户删除成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }).catch((err) => {
      setSubmitting(false);
      toast({
        title: '错误',
        description: `用户删除失败 (${err.message})`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  }

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Flex my={1}>
        <UserAddButton size='md' colorScheme='brand' modalName='增加新用户' mx={1} isDisabled={disabled} onSubmit={handleRefresh}>
          增加用户
        </UserAddButton>
        <DeleteButton size='md' colorScheme='red' mx={1} isDisabled={disabled || selectedCount === 0} users={selectedUsers} onConfirm={handleDelete}>
          删除用户
        </DeleteButton>
        <Spacer />
        <IconButton
          colorScheme='brand'
          icon={<MdOutlineRefresh size='60%' />}
          mx={1}
          isDisabled={disabled}
          onClick={handleRefresh}
        />
      </Flex>
      {disabled ? <Skeleton h="240px" /> : (
        <Table
          {...getTableProps()}
          variant='simple'
          color='gray.500'
          mb='24px'
        >
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                <Th pe='10px' key={index} borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color='gray.400'
                  >
                    #
                  </Flex>
                </Th>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color='gray.400'
                    >
                      {column.render('Header')}
                    </Flex>
                  </Th>
                ))}
                <Th pe='10px' borderColor={borderColor} textAlign='center'>
                  <Flex
                    justify='space-between'
                    // alignSelf='center'
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color='gray.400'
                  >
                    操作
                  </Flex>
                </Th>
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row)
              const user = row.original;
              return (
                <Tr {...row.getRowProps()} key={index}>
                  <Td>
                    <Checkbox
                      isChecked={selectedUsers.includes(user.username)}
                      onChange={() => {
                        if (selectedUsers.includes(user.username)) {
                          setSelectedUsers(selectedUsers.filter((u) => u !== user.username));
                        } else {
                          setSelectedUsers([...selectedUsers, user.username]);
                        }
                      }}
                    />
                  </Td>
                  {row.cells.map((cell, index) => {
                    let data = ''
                    if (cell.column.Header === '用户名') {
                      data = (
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        </Flex>
                      )
                    } else if (cell.column.Header === '角色') {
                      data = (
                        <Flex align='center'>
                          <Text
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'
                          >
                            {cell.value.join(', ')}
                          </Text>
                        </Flex>
                      )
                    } else {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      )
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor='transparent'
                      >
                        {data}
                      </Td>
                    )
                  })}
                  <Td textAlign='start'>
                    <UserModifyButton
                      colorScheme='brand'
                      size='sm'
                      isDisabled={disabled}
                      initialData={user}
                      onSubmit={handleRefresh}
                    >
                      修改用户
                    </UserModifyButton>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Card>
  );
}
