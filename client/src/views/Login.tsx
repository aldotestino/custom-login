import {useState} from 'react';
import {
  Button,
  Heading,
  VStack,
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
  Link,
  useToast
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {URI} from "../vars";
import {Link as RLink, Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../store/userStore";

function Login() {

  const color = useColorModeValue(`purple.500`, `purple.200`);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {setUser, isAuth} = useAuth();

  return (
    <VStack pt={20} spacing={4}>
      {isAuth && <Navigate to="/secret"/>}
      <Heading>Login</Heading>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={async (values) => {
          setIsLoading(true)
          if(values.email !== '' && values.password !== '') {
            const res = await fetch(`${URI}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(values)
            }).then(r => r.json());
            setIsLoading(false);
            if(res.success) {
              setUser(res.data.user);
            }else {
              toast({
                title: 'Errore',
                description: res.data.errorMessage,
                duration: 5000,
                isClosable: true,
                position: 'top-right',
                status: 'error'
              })
            }
          }
        }}
      >
        <Form>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input disabled={isLoading} required focusBorderColor={color} w="xs" as={Field} type="email" placeholder="selena@gmail.com" name="email" id="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input disabled={isLoading} required focusBorderColor={color} as={Field} type="password" placeholder="******" name="password" id="password" />
            </FormControl>
            <Button disabled={isLoading} isLoading={isLoading} colorScheme="purple" w="xs" type="submit">Login</Button>
            <Link color={color} as={RLink} to="/register">Non ho un account.</Link>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  )
}

export default Login;
