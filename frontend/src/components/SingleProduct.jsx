import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/product/product.action";
import { AiTwotoneStar } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { addToCart, getAllCarts } from "../redux/cart/cart.action";

const SingleProduct = () => {
  const { singleProduct } = useSelector((store) => store.Product);
  const { cartData } = useSelector((store) => store.Cart);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();
  const { id } = useParams();

  // --------- get single product -------
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, []);

  // -------- add to cart --------
  const handle_cart_click = (cart) => {
    setLoading(true);
    dispatch(getAllCarts());
    if (qty <= 0) {
      // --- Alert --
      toast({
        title: "Can't add with less than 1 quantity !!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    } else {
      // ---------- checking if data already exist in cart or not ------
      setTimeout(() => {
        if (
          cartData &&
          cartData.filter((el) => el.title === cart.title).length >= 1
        ) {
          // --- Alert --
          toast({
            title: "Product already Added in your cart!!",
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          setLoading(false);
        } else {
          dispatch(
            addToCart({
              ...cart,
              quantity: +qty,
              price: qty * cart.price,
            })
          );
          // --- Alert --
          toast({
            title: "Product added to cart",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {
            dispatch(getAllCarts());
            setLoading(false);
          }, 700);
        }
      }, 500);
    }
  };

  return (
    <Box bg="#f1f3f8" p="5" borderRadius={10} w="90%" textAlign="left" m="auto">
      {/* ---- title ----- */}
      <Text fontWeight={550} fontSize="26" ml="2">
        {singleProduct.title}
      </Text>

      {Object.keys(singleProduct).length == 0 ? (
        <Stack w="90%" m="auto">
          <Heading color="green" textAlign="center" fontSize={30}>
            loading please wait...
          </Heading>
          <Skeleton h="26px" />
          <Skeleton h="60px" />
          <Skeleton h="26px" />
        </Stack>
      ) : (
        <Box
          display={["grid", "grid", "flex", "flex"]}
          gap="10"
          bg="#faf6f3"
          p="5"
          borderRadius={10}
          w="99%"
          textAlign="left"
          m="auto"
          mt="8"
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        >
          <Image w="550px" h="410px" src={singleProduct.image} alt="img" />

          {/* --------------- right side ----- */}
          <Box
            boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
            bg="#ffff"
            p="5"
            pb="6"
            borderRadius={10}
          >
            <Text fontSize="15" fontWeight="bold">
              Categories:{" "}
              <span style={{ color: "#3d73a9" }}>{singleProduct.category}</span>
            </Text>

            {/* ---------- rating ----- */}
            <Box display="flex" gap="10">
              <Text
                display="flex"
                alignItems="center"
                fontSize={18}
                mt="2"
                fontWeight={"bold"}
              >
                {singleProduct.rating?.rate}
                <span style={{ color: "#fce259" }}>
                  <AiTwotoneStar />
                </span>
              </Text>
              <Text mt="8px" color="#565e59">
                ({singleProduct.rating?.count} costumers)
              </Text>
            </Box>

            <br />

            {/* --------- price ----- */}
            <Heading fontSize={38} color={"#333e48"}>
              ₹{Math.floor(singleProduct.price)}.00
              <span style={{ fontSize: "13px" }}> MRP</span>
            </Heading>

            <Text fontSize={15} mt="4">
              (Inclusive of all taxes)
            </Text>

            {/* --------- qty - cart------ */}
            <Box display={"flex"} w="240px" gap="9" mt="1">
              <InputGroup>
                <InputLeftAddon children="Qty" />
                <Input
                  onChange={(e) => setQty(e.target.value)}
                  borderColor="#cecece"
                  fontWeight={600}
                  color="#333e48"
                  fontSize={24}
                  w="60px"
                  type="number"
                  defaultValue={1}
                />
              </InputGroup>
              <Button
                // -------- adding data to cart ------
                onClick={() => handle_cart_click(singleProduct)}
                bg="#e73841"
                color="#ffff"
                _hover={{ bg: "#f04244" }}
                w="400px"
                borderRadius={10}
                pl="2"
                pr="2"
                isLoading={loading ? true : false}
              >
                <BsCart style={{ color: "#ffff" }} />
                &nbsp; ADD
              </Button>
            </Box>
            <Heading mt="10" fontSize="17" color="#e73841">
              Description
            </Heading>
            <Text
              mt="2"
              color="#676767"
              opacity={2}
              fontSize="17"
              fontWeight={500}
            >
              {singleProduct.description}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SingleProduct;
