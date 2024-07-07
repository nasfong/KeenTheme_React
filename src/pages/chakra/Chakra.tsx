import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react"
import ChakraHookForm from "./ChakraHookForm"

const Chakra = () => {
  return (
    <Card>
      <CardHeader>
        <Text fontWeight={600} fontSize={30}>
          Chakra UI
        </Text>
      </CardHeader>
      <CardBody>
        <ChakraHookForm />
      </CardBody>
    </Card>
  )
}

export default Chakra