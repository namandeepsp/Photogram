import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { IProfileResponse } from "@/types";
import { FunctionComponent, useEffect, useState } from "react";
import image2 from "../../assets/images/image2.jpg";
import { Button } from "@/components/ui/button";
import { Edit2Icon, HeartIcon } from "lucide-react";
import MyPhotos from "../myPhotos";
import useFetchPosts from "@/hooks/useFetchPosts";
import Spinner from "@/components/loader";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "@/repository/user.service";

interface IProfileProps {}

const Profile: FunctionComponent<IProfileProps> = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const initialUserInfo: IProfileResponse = {
    id: "",
    userId: user?.uid,
    userBio: "Add here what defines or motivates you...",
    photoURL: user?.photoURL || "",
    displayName: user?.displayName || "Guest User",
  };
  const [userInfo, setUserInfo] = useState<IProfileResponse>(initialUserInfo);
  const [loading, data] = useFetchPosts();

  useEffect(() => {
    if (user) getUserProfileInfo(user?.uid);
  }, [user]);

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

  const editProfile = () => {
    navigate("/edit-profile", { state: userInfo });
  };

  const getUserProfileInfo = async (userId: string) => {
    const data: IProfileResponse = userId ? await getUserProfile(userId) : null;
    if (data && Object.keys(data)?.length > 0) setUserInfo(data);
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Profile
          </h3>
          <div className="p-8 pb-2 border-b">
            <div className="flex flex-row items-center pb-2 mb-2">
              <div className="mr-2">
                <img
                  src={userInfo?.photoURL || image2}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
              <div>
                <div className="text-xl ml-3">{userInfo.displayName}</div>
                <div className="text-xl ml-3">{user?.email || ""}</div>
              </div>
            </div>
            <div className="mb-4">{userInfo?.userBio}</div>
            <div>
              <Button onClick={editProfile}>
                <Edit2Icon className="mr-2 w-4 h-4" /> Edit Profile
              </Button>
            </div>
          </div>
          <div className="p-8 relative">
            <h2 className="mb-5">My Posts</h2>
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

export default Profile;
