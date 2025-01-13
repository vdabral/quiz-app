import React from "react";
import Quiz from "./components/Quiz";
import { Box, Heading } from "@chakra-ui/react";

function App() {
  return (
    <Box textAlign="center" p={5}>
      <Heading mb={6}>Quiz App</Heading>
      <Quiz />
    </Box>
  );
}
export default App;