import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const CartMapping = () => {
  return (
    <Box display="flex" bg="#ffff" p="3" borderRadius={10} gap="3">
      <Image
        w="100px"
        h="130px"
        src="https://nourishstore.co.in/wp-content/uploads/2021/04/70-1-300x300.webp"
        alt="img"
      />
      <Box>
        <Text>Bail Kolhu Cold Pressed Mustard Oil - 500ml Btl</Text>

        <Box
          display="flex"
          gap="3"
          alignItems="center"
          fontWeight={500}
          fontSize={16}
          mt="2"
        >
          <Text border="1px solid grey" borderRadius={50} pr="2" pl="2">
            -
          </Text>
          <Text border="1px solid grey" borderRadius={6} pr="3" pl="3">
            1
          </Text>
          <Text border="1px solid grey" borderRadius={50} pr="2" pl="2">
            +
          </Text>
        </Box>

        <Heading fontSize={20} mt="3" color={"red"}>
          ₹92.00
        </Heading>
        <Text fontSize={14}>(Inclusive of all taxes)</Text>
      </Box>
      <Text color="red" fontSize="20" mt="-5px" mr="-5px">
        <RiDeleteBinLine />
      </Text>
    </Box>
  );
};

export default CartMapping;
