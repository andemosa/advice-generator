import { Box, Flex, Text, CircularProgress } from "@chakra-ui/react";
import useSWRImmutable from "swr/immutable";

import Quote from "./icons/Quote";
import Button from "./icons/Button";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

function App() {
  const { data, error, isLoading, mutate } = useSWRImmutable(
    "https://api.adviceslip.com/advice",
    fetcher
  );

  return (
    <Flex
      height={"100vh"}
      width={"100vw"}
      background={"brand.900"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {error ? (
        <Text>An error occurred while fetching advice</Text>
      ) : isLoading ? (
        <CircularProgress isIndeterminate color="brand.800" />
      ) : (
        <Flex
          gap={6}
          padding={"24px 24px 64px"}
          direction={"column"}
          alignItems={"center"}
          borderRadius={"2xl"}
          maxWidth={"500px"}
          width={{ base: "85%", md: "75%", lg: "60%" }}
          margin={"auto"}
          position={"relative"}
          boxShadow={"30px 50px 80px 80px rgba(0, 0, 0, 0.749)"}
        >
          <Text color={"brand.800"}>ADVICE #{data.slip?.id}</Text>
          <Text color={"brand.700"} textAlign={"center"}>
            “{data.slip?.advice}”
          </Text>
          <Quote />
          <Box
            position={"absolute"}
            bottom={"-30px"}
            cursor={"pointer"}
            onClick={() => mutate()}
          >
            <Button />
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

export default App;
