import {Flex, Heading} from "@chakra-ui/react";
import {ColorModeSwitcher} from "./ColorModeSwitcher";
import * as React from "react";
import {Link} from "react-router-dom";

function NavBar() {
  return (
    <Flex py={4} px={10} justifyContent="space-between" boxShadow="xl">
      <Heading as={Link} to="/">Custom-login</Heading>
      <ColorModeSwitcher />
    </Flex>
  );
}

export default NavBar;
