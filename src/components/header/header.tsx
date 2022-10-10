import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { Link as ReactLink } from "react-router-dom"
import { useMutation } from '@apollo/client';
import { logoutMutationDocument } from '../../graphQL/mutations/logout';
import { useNavigate } from "react-router-dom"
import { Logo } from '../../Logo';

const Links = [{ name: 'Home', href: '/' }, { name: 'Past Orders', href: '/orders' }];

const NavLink = ({ children, to = '' }: { children: ReactNode, to: string }) => (
  <Link
    as={ReactLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={to}>
    {children}
  </Link>
);

export default function Header({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const [logout] = useMutation(logoutMutationDocument, {
    context: {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }
  })
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <MdClose /> : <GiHamburgerMenu />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box width="35px">
            <Logo />

              </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink to={link.href} key={link.name}>{link.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => {
                  logout();
                  localStorage.removeItem('token');
                  navigate('/login')

                }}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink to={link.href} key={link.name}>{link.name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box> {children}</Box>
    </>
  );
}