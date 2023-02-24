import React, { useRef } from "react";
import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../images/splash-screen.png";
import { HiLocationMarker } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../pages/Cart";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <SimpleGrid
      bg="#ffffff"
      display="flex"
      w="100%"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      alignItems={"center"}
      justifyContent="space-between"
      m="auto"
      pt="5"
      pb="5"
      fontSize={18}
      top="0"
      position="sticky"
      zIndex={100}
    >
      <Box
        display="flex"
        m="auto"
        alignItems={"center"}
        justifyContent="space-between"
        gap={5}
        w="76%"
      >
        <Image w="95px" h="50px" src={logo} alt="logo" />
        <InputGroup w="50%">
          <InputLeftElement fontSize={20} children={<HiLocationMarker />} />
          <Input placeholder="Enter address" />
        </InputGroup>

        <InputGroup w="100%">
          <InputRightElement
            fontSize={20}
            bg="#f2f2f2"
            children={<CiSearch />}
          />
          <Input placeholder="Search for Products" />
        </InputGroup>

        <Select title="dummy" borderColor="transparent" w="30%">
          <option value="">Categories</option>
          <option value="men's clothing">men's clothing</option>
        </Select>

        <Text title="dummy">Recipes</Text>

        <Text w="30%" title="dummy">
          Partner With Us
        </Text>
      </Box>
      <Box
        display="flex"
        m="auto"
        gap={5}
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Text
          title="dummy"
          display="flex"
          alignItems="center"
          gap="3"
          fontSize={20}
        >
          <BsPersonCircle style={{ marginTop: "5px", fontSize: "30px" }} />
          <span>signup / login</span>
        </Text>

        {/* -------- cart------ */}
          <Box fontSize={30} ref={btnRef}  onClick={onOpen}>
            <FaShoppingCart />
            <Text
              bg="#e31e24"
              position="absolute"
              top="5"
              ml="5"
              fontSize={15}
              borderRadius={50}
              pl="1.5"
              pr="1.5"
              color="#ffff"
              fontWeight={600}
            >
              0
            </Text>
          </Box>
      </Box>

      {/* ------ cart ------ */}
      <Cart isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </SimpleGrid>
  );
};

export default Navbar;
