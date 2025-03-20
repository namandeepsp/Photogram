import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostsByUserId } from "@/repository/post.service";
import { DocumentResponse, Post } from "@/types";
import { useEffect, useState } from "react";
import { HeartIcon } from "lucide-react";
import Spinner from "@/components/loader";
import useFetchPosts from "@/hooks/useFetchPosts";

interface IMyPhotosProps {}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = () => {
  const [loading, data] = useFetchPosts();

  const renderPosts = () => {
    return data.map((post) => (
      <div key={post?.photos[0]?.uuid} className="relative">
        <div className="group absolute transition-all duration-200 bg-transparent hover:bg-slate-950 hover:opacity-75 top-0 left-0 bottom-0 right-0 w-full h-full">
          <div className="flex justify-center items-center gap-2 w-full h-full">
            <div className="hidden group-hover:block text-white text-2xl">
              {post.likes}
            </div>
            <HeartIcon className="hidden group-hover:block fill-white w-7 h-7" />
          </div>
        </div>
        <img
          src={`${post?.photos[0]?.cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
          alt="posted photo"
        />
      </div>
    ));
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            My Photos
          </h3>
          <div className="p-8 relative">
            {loading ? (
              <div className="flex justify-center items-center bg-transparent">
                <Spinner color="text-slate-800" />
              </div>
            ) : data?.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
                {renderPosts()}
              </div>
            ) : (
              <p className="text-slate-800 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Your posted photos will show here...
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPhotos;
