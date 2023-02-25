import React, { useEffect, useRef } from "react";
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
import { getProductByCategory } from "../redux/product/product.action";
import Cart from "../pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { total } = useSelector((store) => store.Cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const btnRef = useRef();

  // ------- filter ------
  const handleChange = (e) => {
    dispatch(getProductByCategory(e.target.value));
  };

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
        <Link to="/">
          <Image
            display={["none", "none", "block", "block"]}
            w="205px"
            h="50px"
            src={logo}
            alt="logo"
          />
        </Link>
        <InputGroup w="50%" display={["none", "none", "block", "block"]}>
          <InputLeftElement fontSize={20} children={<HiLocationMarker />} />
          <Input placeholder="Enter address" />
        </InputGroup>

        <InputGroup w={["60%", "60%", "100%", "100%"]}>
          <InputRightElement
            fontSize={20}
            bg="#f2f2f2"
            children={<CiSearch />}
          />
          <Input placeholder="Search for Products" />
        </InputGroup>

        {/* -------- filter by category ------- */}
        <Select onChange={handleChange} borderColor="transparent" w="30%">
          <option value="all">Categories</option>
          <option value="all">All</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's clothing</option>
        </Select>

        <Text title="dummy" display={["none", "none", "block", "block"]}>
          Recipes
        </Text>

        <Text
          w="30%"
          title="dummy"
          display={["none", "none", "block", "block"]}
        >
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
        <Box
          title="dummy"
          display="flex"
          alignItems="center"
          gap="3"
          fontSize={20}
        >
          <BsPersonCircle style={{ marginTop: "5px", fontSize: "30px" }} />
          <Text display={["none", "none", "block", "block"]}>
            signup / login
          </Text>
        </Box>

        {/* -------- cart------ */}
        <Box fontSize={30} ref={btnRef} onClick={onOpen} pr="4">
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
            {total}
          </Text>
        </Box>
      </Box>

      {/* ------ cart ------ */}
      <Cart isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </SimpleGrid>
  );
};

export default Navbar;
