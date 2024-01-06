import { Button, useDisclosure } from "@chakra-ui/react";
import UserListModal from 'views/admin/usercontrol/components/UserListModal'
import UserListTable from 'views/admin/usercontrol/components/UserListTable'
function UserList(props) {
  const { children, tableConfig, tableData, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Button {...rest}  onClick={onOpen}>
      {children}
      <UserListModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <UserListTable 
          columnsData={tableConfig}
          tableData={tableData}
      />
    </UserListModal>
    </Button>    
  );
}

export default UserList;
