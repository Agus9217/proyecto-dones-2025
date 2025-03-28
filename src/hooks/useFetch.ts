import { Data } from "@/types";
import { useAuth, useSession, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFetch = () => {
  const [data, setData] = useState<Data | null>(null);
  const [leaderData, setLeaderData] = useState<Data | null>(null);
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
      const userExists = localStorage.getItem("user_created");

      if (userExists) {
        console.log("El usuario ya ha sido creado anteriormente.");
        return;
      }

      await axios.post("http://localhost:4000/user", {
        clerkId: user?.id,
        name: user?.firstName,
        lastName: user?.lastName,
        email: userEmail![0],
        role: orgRole,
      });
      localStorage.setItem("user_created", "true");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchToken = async () => {
    try {
      setLoading(true);
      //const token = await session?.getToken();
      const response = await axios.get("http://localhost:4000/checklist");

      if (response.status === 401) {
        navigate("/");
      }
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      session?.end();
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const leaderGetChecklist = async () => {
    try {
      setLoading(true);
      //const token = await session?.getToken();
      const response = await axios.get("http://localhost:4000/leaderchecklist");

      if (response.status === 401) {
        navigate("/");
      }
      console.log(response.data);
      setLeaderData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      session?.end();
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    fetchToken();
  }, [session, navigate]);

  useEffect(() => {
    if (!isLoaded && !user) {
      navigate("/");
    }
    postUserFetch();
  }, [isLoaded, user]);

  useEffect(() => {
    if (!session) return;
    leaderGetChecklist();
  }, [session, navigate]);

  return { data, loading, leaderData };
};
