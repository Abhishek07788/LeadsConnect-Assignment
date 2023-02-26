import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Input,
  Progress,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataMap from "./DataMap";
import { getAllCarts } from "../../redux/cart/cart.action";
import cartGif from "../../images/cartgif.gif";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartData, loading } = useSelector((store) => store.Cart);
  const [promoCode, setPromoCode] = useState("");
  const [totalPrice, setTotalPrice] = useState();
  const [promoClick, setPromoClick] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  // ---------- get cart data ---------
  useEffect(() => {
    dispatch(getAllCarts());
    document.title = "Cart Page";
  }, []);

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
    <SimpleGrid
      bg="#f1f3f8"
      p="6"
      borderRadius={10}
      w="90%"
      textAlign="left"
      m="auto"
    >
      <Grid bg="#ffff" p="5" borderRadius={10}>
        {/* ---- -------- Progress loading ---------- */}
        <Progress
          size="xs"
          isIndeterminate
          visibility={loading ? "visible" : "hidden"}
        />

        <Heading>Cart</Heading>
        <Text borderBottom={"5px solid #e8ddd6"} w="80px"></Text>

        {cartData.length == 0 ? (
          <Box display="grid">
            <Image m="auto" w="400px" h="300px" src={cartGif} alt="empty" />;
            <Button
              w="200px"
              m="auto"
              border="1px solid red"
              color="red"
              pl="2"
              pr="2"
            >
              <Link to="/">Browse Products</Link>
            </Button>
          </Box>
        ) : (
          <SimpleGrid columns={[1, 1, 2, 2]} spacing="20">
            {/* ------------ cart data mapping -------- */}
            <Grid mt="4" display={"grid"} gap="5">
              {cartData &&
                cartData.map((el) => <DataMap key={el.id} {...el} />)}

              {/* ----------- Promo Code ------------- */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt="10"
                fontSize={14}
                w="90%"
                m="auto"
              >
                <Input
                  onChange={(e) => setPromoCode(e.target.value)}
                  fontSize={[12, 15, 15, 20]}
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
                  fontSize={[12, 15, 15, 20]}
                >
                  Apply Promo
                </Button>
              </Box>
            </Grid>
            {/* ------------ cart data total -------- */}
            <Grid
              m="auto"
              // ml="20"
              mt="4"
              spacing="5"
              border="3px dotted red"
              bg="#f0f0f0"
              borderRadius={20}
              w="80%"
              p="6"
              h="300px"
            >
              <Box p="2" w="100%">
                <Box
                  display={["flex", "flex", "grid", "flex"]}
                  justifyContent="space-between"
                >
                  <Heading fontSize={[15, 18, 20, 28]}>
                    Subtotal (1 item):
                  </Heading>
                  <Heading fontSize={[15, 18, 20, 28]}>
                    ₹{Math.floor(totalPrice)}.00
                  </Heading>
                </Box>
                <Box
                  mt="5"
                  display={["flex", "flex", "grid", "flex"]}
                  justifyContent="space-between"
                  fontWeight={600}
                  fontSize={[15, 18, 20, 20]}
                >
                  <Text>Total</Text>
                  <Box textAlign={["right", "right", "left", "right"]}>
                    <Text>₹{Math.floor(totalPrice)}.00</Text>
                    <Text fontSize={[9, 10, 10, 12]}>
                      (incl. GST & delivery)
                    </Text>
                  </Box>
                </Box>

                <Button
                  bg="#e73841"
                  color={"#ffff"}
                  w="100%"
                  mt="10"
                  fontSize={[16, 18, 18, 28]}
                  fontWeight="600"
                  p={[3, 3, 3, 7]}
                  _hover={{ bg: "#e73841" }}
                >
                  CONTINUE
                </Button>
                <Text
                  mt={["4", "4", "10", "4"]}
                  fontSize={[12, 14, 14, 17]}
                  color="#5da4e1"
                >
                  Explore more on NOURISH Store
                </Text>
              </Box>
            </Grid>
          </SimpleGrid>
        )}
      </Grid>
    </SimpleGrid>
  );
};

export default CartPage;
