import { Container } from '@chakra-ui/react';
import { SyncLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <Container
      h={'100vh'}
      w={'100vw'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <SyncLoader size={20} color={'#FFD700'} />
    </Container>
  );
};
