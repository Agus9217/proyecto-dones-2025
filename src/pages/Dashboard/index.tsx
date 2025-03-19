import { CheckboxItem, LeaderCheckboxItem, Loader, Navbar } from '@/components';
import { useFetch } from '@/hooks/useFetch';
import { Container, Heading } from '@chakra-ui/react';
import { Tabs } from '@chakra-ui/react';

export const Dashboard = () => {
  const { data, loading } = useFetch();

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
          <Tabs.Content value="leader">
            <LeaderCheckboxItem {...data} />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </>
  );
};
