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
  Progress,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DataMap from "./DataMap";
import cartGif from "../../images/cartgif.gif";
import { Link } from "react-router-dom";

const CartDrawer = ({ btnRef, isOpen, onClose }) => {
  const { cartData, loading } = useSelector((store) => store.Cart);
  const [promoCode, setPromoCode] = useState("");
  const [totalPrice, setTotalPrice] = useState();
  const [promoClick, setPromoClick] = useState(false);
  const toast = useToast();

  // ---------- get cart totalPrice ---------
  useEffect(() => {
    if (cartData.length >= 1) {
      setTotalPrice(
        cartData.reduce((acc, el) => {
          return (acc += el.price);
        }, 0)
      );
    }
  }, [cartData]);

  // ----------- Promo Code ---------
  const handleClick = () => {
    if (promoClick) {
      // --- Alert --
      toast({
        title: "Already used!!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      if (promoCode === "FLAT20" || promoCode === "flat20") {
        setTotalPrice(totalPrice - (20 / 100) * totalPrice);
        // --- Alert --
        toast({
          title: "Promo Code Added.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setPromoClick(true);
      } else {
        // --- Alert --
        toast({
          title: "Wrong Promo Code!!",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

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

          {/* ---- -------- Progress loading ---------- */}
          <Progress
            size="xs"
            isIndeterminate
            visibility={loading ? "visible" : "hidden"}
          />
          {/* ---------- BODY --------- */}
          {cartData.length === 0 ? (
            <Image src={cartGif} alt="empty cart" />
          ) : (
            <DrawerBody bg="#f1f3f8">
              <Text fontSize={14}>
                Add ₹1,407.00 more to avail WELCOME10 offer
              </Text>

              {/* ------------ cart data mapping -------- */}
              <SimpleGrid mt="4" spacing="5">
                {cartData &&
                  cartData.map((el) => <DataMap key={el.id} {...el} />)}
              </SimpleGrid>

              {/* ----------- Promo Code ------------- */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap="5"
                mt="10"
                fontSize={14}
              >
                <Input
                  onChange={(e) => setPromoCode(e.target.value)}
                  bg="#ffff"
                  borderColor="grey"
                  placeholder="Promo code 'FLAT20' "
                />
                <Button
                  onClick={handleClick}
                  bg="#e73841"
                  color="#ffff"
                  borderColor="#e73841"
                  pr="8"
                  pl="8"
                  _hover={{ bg: "#e73841" }}
                >
                  Apply
                </Button>
              </Box>
            </DrawerBody>
          )}

          {/* ---------- fOOTER --------- */}
          {cartData.length == 0 ? (
            <Button
              onClick={onClose}
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
                  <Text>₹{Math.floor(totalPrice)}.00</Text>
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
                  <Text>₹{Math.floor(totalPrice)}.00</Text>
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
                  fontSize={[12, 14, 16, 16]}
                  gap="2"
                >
                  <Link to="/cart">
                    <Button
                      onClick={onClose}
                      border="1px solid red"
                      pl="2"
                      pr="2"
                    >
                      View Cart
                    </Button>
                  </Link>
                  <Button
                    color="#ffff"
                    bg="red"
                    pl="2"
                    pr="2"
                    _hover={{ bg: "red" }}
                  >
                    Checkout Now
                  </Button>
                  <Button
                    onClick={onClose}
                    border="1px solid red"
                    pl="2"
                    pr="2"
                  >
                    Browse Products
                  </Button>
                </Box>
              </Box>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
