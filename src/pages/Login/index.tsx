import { Button } from '@/components/ui/button';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { SignedOut, SignInButton, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from '../../assets/img/logo-iglesia.png'

export const Login = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);


  return (
    <SignedOut>
      <Flex
        w={'100%'}
        h={'100dvh'}
        justifyContent={'center'}
        alignItems={'center'}
        direction={'column'}
        gap={'50px'}
      >
        <Flex
          justifyContent={'center'}
        >
          <Flex
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'20px'}
          >
            <Box
              maxW={'250px'}
            >
              <Image src={imgLogo} alt={'Logo iglesia'} />
            </Box>
            <Heading
              fontSize={{ base: '3xl', sm: '4xl' }}
            >
              Descubre tus Dones
            </Heading>
            <Text
              textAlign={'center'}
              w={'60%'}
            >
              Inicia sesión contesta las preguntas y decubre tus Dones.
            </Text>
          </Flex>
        </Flex>
        <Button colorPalette={'yellow'} rounded={'xl'} as={SignInButton}>Iniciar prueba</Button>
      </Flex>
    </SignedOut>
  );
};
