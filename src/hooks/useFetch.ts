import { Data } from '@/types';
import { useAuth, useSession, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFetch = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { session } = useSession();
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const { orgRole } = useAuth();

  const userEmail = user?.emailAddresses.map((email) => {
    return email.emailAddress;
  });

  const postUserFetch = async () => {
    try {
      await axios.post('http://localhost:4000/user', {
        name: user?.firstName,
        lastName: user?.lastName,
        email: userEmail![0],
        role: orgRole,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchToken = async () => {
    try {
      setLoading(true);
      //const token = await session?.getToken();
      const response = await axios.get('http://localhost:4000/user');

      if (response.status === 401) {
        navigate('/');
      }
      setData(response.data.user);
    } catch (error) {
      console.error('Error fetching data:', error);
      session?.end();
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    fetchToken();
  }, [session, navigate]);

  useEffect(() => {
    if (isLoaded && user) {
      postUserFetch();
    }
    postUserFetch();
  }, [isLoaded, user]);

  return { data, loading };
};
