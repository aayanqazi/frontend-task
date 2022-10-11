import { useQuery } from "@apollo/client";
import { Box, Flex, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { getUserDetailQueryDocument } from "../../graphQL/queries/getUserDetail";

export const Profile = () => {
  const { data, loading } = useQuery(getUserDetailQueryDocument, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const userDetails = [
    { name: "Name", value: data?.user?.name },
    { name: "Email", value: data?.user?.email },
    { name: "Country", value: data?.user?.country },
    { name: "City", value: data?.user?.city },
    { name: "Address", value: data?.user?.address1 },
  ];

  return (
    <Box margin="0 auto">
      <Text
        textAlign="center"
        fontWeight="900"
        fontSize={["5xl", "5xl", "7xl"]}
      >
        User Details
      </Text>
      {loading ? <Flex justifyContent="center"><Spinner /></Flex>:  <VStack px="20" mt="8" justifyContent={"center"}>
        {userDetails?.map((val, key) => {
          return (
            <HStack  key={key} >
              <Text w={['150px','150px','300px']} fontWeight={"bold"} fontSize={["2xl", "2xl", "3xl"]}>
                {val?.name}:
              </Text>
              <Text w={['150px','150px','300px']}  fontSize={["2xl", "2xl", "3xl"]}>{val?.value}</Text>
            </HStack>
          );
        })}
      </VStack>}
     
    </Box>
  );
};
