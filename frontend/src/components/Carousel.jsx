import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const images = [
    "https://nourishstore.co.in/wp-content/uploads/2023/02/13-02-2023-DESKTOP-BANNER_Width-1401px-and-Height-650px-1-1.gif",
    "https://nourishstore.co.in/wp-content/uploads/2023/02/Nourish-dry-fruits-min-1.webp",
    "https://nourishstore.co.in/wp-content/uploads/2023/02/Nourish-banner-daliya-min-2.webp",
    "https://nourishstore.co.in/wp-content/uploads/2022/05/19-05-2022-Nourish-Banners-DESKTOP-Width-1401px-and-Height-650px-4-min.webp",
  ];

  // -------- changing image after 6 sec -------
  useEffect(() => {
    setTimeout(() => {
      setCurrent(current === images.length - 1 ? 0 : current + 1);
    }, 6000);
  }, [current]);

  return (
    <Box w="100%">
      <Image
        animation={"ease-in-out"}
        w="100%"
        h="500px"
        src={images[current]}
        alt="carousel"
      />

      {/* --------- changing dots ------ */}
      <Box
        display={"flex"}
        gap="3"
        w="100px"
        textAlign="center"
        m="auto"
        mt="4"
        cursor="pointer"
      >
        <Text
          onClick={() => setCurrent(0)}
          bg={current === 0 ? "red" : "grey"}
          w={current === 0 ? "30px" : "10px"}
          h="10px"
          borderRadius={50}
        ></Text>
        <Text
          onClick={() => setCurrent(1)}
          bg={current === 1 ? "red" : "grey"}
          w={current === 1 ? "30px" : "10px"}
          h="10px"
          borderRadius={50}
        ></Text>
        <Text
          onClick={() => setCurrent(2)}
          bg={current === 2 ? "red" : "grey"}
          w={current === 2 ? "30px" : "10px"}
          h="10px"
          borderRadius={50}
        ></Text>
        <Text
          onClick={() => setCurrent(3)}
          bg={current === 3 ? "red" : "grey"}
          w={current === 3 ? "30px" : "10px"}
          h="10px"
          borderRadius={50}
        ></Text>
      </Box>
    </Box>
  );
};

export default Carousel;
