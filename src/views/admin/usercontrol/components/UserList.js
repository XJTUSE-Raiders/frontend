import { useDisclosure } from "@chakra-ui/react";
import Card from "components/card/Card";
import CommonModal from 'views/admin/dashboard/components/CommonModal'
import DetailTable from 'views/admin/dashboard/components/DetailTable'
function CardwithModal(props) {
  const { children, tableConfig, tableData, tableName, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card {...rest}  onClick={onOpen}>
      {children}
      <CommonModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <DetailTable 
          columnsData={tableConfig}
          tableData={tableData}
          tableName={tableName}
      />
    </CommonModal>
    </Card>    
  );
}

export default CardwithModal;
