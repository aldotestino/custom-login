import {Button, VStack} from "@chakra-ui/react";
import {Navigate, Link as RLink} from "react-router-dom";
import {useAuth} from "../store/userStore";

function Home() {

  const {isAuth} = useAuth();

  return (
    <VStack pt={20} spacing={4}>
      {isAuth && <Navigate to="/secret"/>}
      <Button size="lg" w="200px" colorScheme="purple" as={RLink} to="/register">
        Registrati
      </Button>
      <Button size="lg" w="200px" colorScheme="purple" as={RLink} to="/login">
        Login
      </Button>
    </VStack>
  )
}

export default Home;
