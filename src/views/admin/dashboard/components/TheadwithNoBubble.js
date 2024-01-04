const { Thead } = require("@chakra-ui/react");

function TheadwithNoBubble(props) {
  const {children, ...rest} = props;
  return (
    <Thead {...rest} onClick={e => {e.stopPropagation()}}>
      {children}
    </Thead>
  )
}

export default TheadwithNoBubble;