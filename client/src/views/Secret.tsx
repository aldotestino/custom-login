import {Heading, Text, VStack, Button} from '@chakra-ui/react'
import {useAuth} from "../store/userStore";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Secret() {
  const {isAuth, user, logout} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuth) {
      navigate("/login");
    }
  }, [isAuth])

  return (
    <>
      {!isAuth && <Navigate to="/login" />}
      <VStack pt={20} spacing={4}>
        <Heading>Informazioni utente</Heading>
        <Text fontSize="lg">Nome: {user?.firstName}</Text>
        <Text fontSize="lg">Cognome: {user?.lastName}</Text>
        <Text fontSize="lg">Email: {user?.email}</Text>
        <Text fontSize="lg">Id: {user?.id}</Text>
        <Button w="xs" colorScheme="purple" onClick={logout}>Logout</Button>
      </VStack>
    </>
  )
}

export default Secret;
