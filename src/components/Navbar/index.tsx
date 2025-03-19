import {
  Box,
  Flex,
  Stack,
  Image,
  Text,
  Container,
} from '@chakra-ui/react';
import { SignedIn, useAuth, UserButton, useUser } from '@clerk/clerk-react';
import logoImg from '../../assets/img/logo-iglesia.png';

export const Navbar = () => {
  const { user } = useUser()

  return (
    <Stack
      as={'header'}
      w={'100%'}
      minH={'60px'}
      borderWidth={'1px'}
      borderColor={'bg.emphasized'}
      justifyContent={'space-between'}
      alignItems={'center'}
      direction={'row'}
    >
      <Container
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        w={'90%'}
      >
        <Flex alignItems={'center'} justifyContent={'center'} gap={'20px'}>
          <Image src={logoImg} alt={'Logo de la iglesia'} w={'150px'} />
        </Flex>
        <Box>
          <SignedIn>
            <Flex gap={'10px'}>
              <Text display={{ base: 'none', md: 'block' }} fontWeight={'bold'}>{`${user?.fullName}`}</Text>
              <UserButton />
            </Flex>
          </SignedIn>
        </Box>
      </Container>
    </Stack>
  );
};
