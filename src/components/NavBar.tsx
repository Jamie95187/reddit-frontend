import React from 'react';
import { Box, Link, Flex, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{data, fetching}] = useMeQuery();
  let body = null;

  // data is loading
  if (fetching) {

    // user not logged in
  } else if (!data?.me) {
    console.log("user not logged in");
    body = (
      <>
        <NextLink href="/login">
          <Link colour='white' mr={2}> login </Link>
        </NextLink>
        <NextLink href="/register">
          <Link colour='white'> register </Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    console.log("user logged in");
    body = (
      <Flex>
        <Box mr={3}>{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    )
  }

  return (
    <Flex bg='teal' p={4} ml={"auto"}>
      <Box ml={"auto"}>
        {body}
      </Box>
    </Flex>
  )
}
