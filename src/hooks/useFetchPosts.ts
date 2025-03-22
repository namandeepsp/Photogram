import { useUserAuth } from "@/context/userAuthContext";
import { getPostsByUserId } from "@/repository/post.service";
import { DocumentResponse, Post } from "@/types";
import { useEffect, useState } from "react";

const useFetchPosts = () => {
  const { user } = useUserAuth();
  const [data, setData] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      getAllPosts(user.uid);
    }
  }, []);

  const getAllPosts = async (id: string) => {
    try {
      const querySnapshot = await getPostsByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          tempArr.push(responseObj);
          setData(tempArr);
        });
      }
    } catch (error) {
      console.log("Error while fetching your posts: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data };
};

export default useFetchPosts;
