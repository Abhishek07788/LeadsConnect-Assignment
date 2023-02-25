import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CartMapping from "../components/CartMapping";
import cartGif from "../images/cartgif.gif";
import { Link } from "react-router-dom";

const Cart = ({ btnRef, isOpen, onClose }) => {
  const { cartData } = useSelector((store) => store.Cart);
  const [total, setTotal] = useState();

  // ---------- get cart total ---------
  useEffect(() => {
    if (cartData.length >= 1) {
      setTotal(
        cartData.reduce((acc, el) => {
          return (acc += el.price);
        }, 0)
      );
    }
  }, [cartData]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            display="flex"
            fontSize={18}
            gap="8"
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          >
            <Text borderBottom="2px solid red" color="red">
              Nutrition Cart
            </Text>
            <Text title="dummy">Your Offers</Text>
          </DrawerHeader>

          {/* ---------- BODY --------- */}
          {cartData.length == 0 ? (
            <Image src={cartGif} alt="empty cart" />
          ) : (
            <DrawerBody bg="#f1f3f8">
              <Text fontSize={14}>
                Add ₹1,407.00 more to avail WELCOME10 offer
              </Text>

              {/* ------------ cart data mapping -------- */}
              <SimpleGrid mt="4" spacing="5">
                {cartData &&
                  cartData.map((el) => <CartMapping key={el.id} {...el} />)}
              </SimpleGrid>

              {/* --- Promo Code --- */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap="5"
                mt="10"
                fontSize={14}
              >
                <Input bg="#ffff" borderColor="grey" placeholder="Promo code" />
                <Button
                  bg="#e73841"
                  color="#ffff"
                  borderColor="#e73841"
                  pr="8"
                  pl="8"
                  _hover={{ color: "#e73841" }}
                >
                  Apply
                </Button>
              </Box>
            </DrawerBody>
          )}

          {/* ---------- fOOTER --------- */}
          {cartData.length == 0 ? (
            <Button
              color="#e73841"
              bg="#d7d7d7"
              w="200px"
              m="auto"
              border="1px solid #e73841"
              fontSize={20}
            >
              <Link to="/">Browse Products</Link>
            </Button>
          ) : (
            <DrawerFooter>
              <Box bg="#ffff" p="2" w="100%">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontWeight={600}
                  color="grey"
                  fontSize={16}
                >
                  <Text>Total MRP Price ( 1 item )</Text>
                  <Text>₹{Math.floor(total)}.00</Text>
                </Box>
                <Box
                  mt="2"
                  display="flex"
                  justifyContent="space-between"
                  fontWeight={600}
                  color="grey"
                  fontSize={16}
                >
                  <Text>Discount</Text>
                  <Text>₹0.00</Text>
                </Box>
                <Box
                  mt="2"
                  display="flex"
                  justifyContent="space-between"
                  fontWeight={600}
                  color="grey"
                  fontSize={16}
                >
                  <Text>
                    Offer{" "}
                    <span style={{ color: "#526fb8" }}>(View Offers )</span>
                  </Text>
                  <Text>₹0.00</Text>
                </Box>

                <Text mb="3" fontSize="11">
                  Shipping & taxes calculated at checkout.
                </Text>
                <hr />
                <Box
                  mt={3}
                  display="flex"
                  justifyContent="space-between"
                  fontWeight={600}
                  color="grey"
                  fontSize={16}
                >
                  <Text>Total MRP Price ( 1 item )</Text>
                  <Text>₹{Math.floor(total)}.00</Text>
                </Box>
                <Text mb="3" fontSize="13" color="#6ac694">
                  Total Discount -₹0.00 (0.00 %) on this order
                </Text>

                <Box
                  mt={3}
                  display="flex"
                  justifyContent="space-between"
                  borderColor="red"
                  color="red"
                  bg="#f1f3f8"
                  fontSize={16}
                  gap="2"
                >
                  <Button border="1px solid red">View Cart</Button>
                  <Button color="#ffff" bg="red">
                    Checkout Now
                  </Button>
                  <Button border="1px solid red">Browse Products</Button>
                </Box>
              </Box>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
