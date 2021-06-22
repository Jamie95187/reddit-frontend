import React from 'react';
import { Box, Link, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg='salmon' p={4} ml={"auto"}>
      <Box ml={"auto"}>
      <NextLink href="/login">
        <Link colour='white' mr={2}> login </Link>
      </NextLink>
      <NextLink href="/register">
        <Link colour='white'> register </Link>
      </NextLink>
      </Box>
    </Flex>
  )
}
