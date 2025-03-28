import { CheckboxItem, LeaderCheckboxItem, Loader, Navbar } from '@/components';
import { useFetch } from '@/hooks/useFetch';
import { Container, Heading, Show } from '@chakra-ui/react';
import { Tabs } from '@chakra-ui/react';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { data, loading, leaderData } = useFetch();
  const { orgRole, isSignedIn } = useAuth()
  const navigate = useNavigate()

  
  useEffect(() => {
    if (!isSignedIn) {
      navigate('/')
    }
  }, [isSignedIn, navigate])
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <>
      <Navbar />
      <Container w={'90%'}>
        <Heading as={'h1'} fontSize={{ base: '2xl', md: '3xl' }} my={'2rem'}>
          Descubre tus dones
        </Heading>
        <Tabs.Root
          defaultValue="miembro"
          colorPalette={'yellow'}
        >
          <Tabs.List>
            <Tabs.Trigger value="miembro">Miembro</Tabs.Trigger>
            <Tabs.Trigger value="leader">Lider</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="miembro">
            <CheckboxItem {...data} />
          </Tabs.Content>
          <Show when={ orgRole === "org:admin"  }>
          <Tabs.Content value="leader">
            <LeaderCheckboxItem {...leaderData} />
          </Tabs.Content>
          </Show>
        </Tabs.Root>
      </Container>
    </>
  );
};
