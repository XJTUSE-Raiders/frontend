import { Button, useDisclosure } from "@chakra-ui/react";
import UserModifyModal from 'views/admin/usercontrol/components/UserModifyModal'
import UserModifyTable from 'views/admin/usercontrol/components/UserModifyTable'
function UserModifyButton(props) {
  const { children, tableConfig, tableData, modalName, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Button {...rest}  onClick={onOpen}>
      {children}
      <UserModifyModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} modalName={modalName}>
      <UserModifyTable 
          columnsData={tableConfig}
          tableData={tableData}
      />
    </UserModifyModal>
    </Button>    
  );
}

export default UserModifyButton;
