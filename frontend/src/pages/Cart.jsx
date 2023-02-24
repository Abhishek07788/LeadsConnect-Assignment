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
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CartMapping from "../components/CartMapping";

const Cart = ({ btnRef, isOpen, onClose }) => {
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

          <DrawerBody bg="#f1f3f8">
            <Text fontSize={14}>
              Add ₹1,407.00 more to avail WELCOME10 offer
            </Text>

            {/* ------------ cart data mapping -------- */}
            <SimpleGrid mt="4">
              <CartMapping />
            </SimpleGrid>
          </DrawerBody>

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
                <Text>₹92.00</Text>
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
                  Offer <span style={{ color: "#526fb8" }}>(View Offers )</span>
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
                <Text>₹92.00</Text>
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
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
