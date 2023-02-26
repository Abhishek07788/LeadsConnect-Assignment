import React, { useRef } from "react";
import {
  Box,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Progress,
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
import Cart from "../components/cart_drawer/CartDrawer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { Loading, Error } = useSelector((store) => store.Product);
  const { total } = useSelector((store) => store.Cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const btnRef = useRef();

  // ------- filter ------
  const handleChange = (e) => {
    dispatch(getProductByCategory(e.target.value));
    navigate("/");
  };

  return (
    <>
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
              w={["115px", "115px", "215px", "315px"]}
              h={["40px", "40px", "50px", "50px"]}
              src={logo}
              alt="logo"
              ml={[3, 3, 0, 0]}
            />
          </Link>
          <InputGroup w="40%" display={["none", "none", "block", "block"]}>
            <InputLeftElement fontSize={20} children={<HiLocationMarker />} />
            <Input placeholder="Enter address" />
          </InputGroup>

          <InputGroup
            w={["50%", "50%", "60%", "100%"]}
            display={["none", "none", "block", "block"]}
          >
            <InputRightElement
              fontSize={20}
              bg="#f2f2f2"
              children={<CiSearch />}
            />
            <Input placeholder="Search for Products" />
          </InputGroup>

          {/* -------- filter by category ------- */}
          <Select
            mr={[6, 6, 0, 0]}
            onChange={handleChange}
            borderColor="transparent"
            w="30%"
          >
            <option value="all">Categories</option>
            <option value="all">All</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's clothing</option>
          </Select>

          <Text title="dummy" display={["none", "none", "none", "block"]}>
            Recipes
          </Text>

          <Text
            w="30%"
            title="dummy"
            display={["none", "none", "none", "block"]}
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
            mr={[6, 6, 0, 0]}
          >
            <BsPersonCircle style={{ fontSize: "30px" }} />
            <Text display={["none", "none", "none", "block"]}>
              signup / login
            </Text>
          </Box>

          {/* -------- cart------ */}
          <Box
            fontSize={30}
            ref={btnRef}
            onClick={onOpen}
            pr={"4"}
            mr={[6, 6, 0, 0]}
          >
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

      {/* ---------- loading indicator -------- */}
      <Progress
        size="xs"
        isIndeterminate
        visibility={Loading ? "visible" : "hidden"}
      />
      {/* ---------- error indicator -------- */}
      {Error ? (
        <Heading color="teal" fontSize={20} textAlign="center">
          server error please refresh the page...
        </Heading>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
