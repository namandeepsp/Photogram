import image1 from "@/assets/images/image1.jpg";
import { useUserAuth } from "@/context/userAuthContext";
import { useUsers } from "@/context/UsersContext";
import { cn } from "@/lib/utils";
import { updateLikesOnPost } from "@/repository/post.service";
import { DocumentResponse, ICommentResponse, LikesInfo } from "@/types";
import { HeartIcon, MessageCircle } from "lucide-react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface IPostCardProps {
  data: DocumentResponse;
  setCommentOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentPostId: Dispatch<SetStateAction<string>>;
  setComments: React.Dispatch<React.SetStateAction<ICommentResponse[]>>;
}

const PostCard: FunctionComponent<IPostCardProps> = ({
  data,
  setCommentOpen,
  setCurrentPostId,
  setComments,
}) => {
  const { user } = useUserAuth();
  const uid = user?.uid; // Only used if user is not null
  const { users } = useUsers();
  const [likesInfo, setLikesInfo] = useState<LikesInfo>({
    likes: data.likes,
    isLiked: uid ? data.userLikes.includes(uid) : false, // TODO: Fix this
  });

  const handleLike = async (isLiked: boolean) => {
    if (!uid) return;
    const totalLikes = likesInfo.likes + (isLiked ? 1 : -1);
    const newUserLikes = [...data.userLikes];
    if (isLiked) {
      newUserLikes.push(uid);
    } else {
      newUserLikes.splice(newUserLikes.indexOf(uid), 1);
    }
    setLikesInfo({
      likes: totalLikes,
      isLiked: isLiked,
    });
    await updateLikesOnPost(data.id, newUserLikes, totalLikes);
  };

  const handleCommentClick = (postId: string) => {
    setComments([]);
    setCommentOpen((prev) => !prev);
    setCurrentPostId(postId);
  };

  const getUser = () => users?.find((user) => user.userId === data.userId);
  const userDetails = getUser();

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col p-3">
        <CardTitle className="text-sm text-center flex justify-start items-center">
          <span className="mr-2">
            <img
              src={userDetails?.photoURL || image1}
              alt="User profile pic"
              className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
            />
          </span>
          <span>{userDetails?.displayName || "Guest User"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src={data?.photos?.length ? data?.photos?.[0].cdnUrl : "#"}
          alt=""
        />
      </CardContent>
      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3">
          <HeartIcon
            className={cn(
              "mr-3",
              "cursor-pointer hover:fill-red-600",
              likesInfo.isLiked ? "fill-red-600" : "fill-none"
            )}
            onClick={() => handleLike(!likesInfo.isLiked)}
          />
          <MessageCircle
            className="mr-3 cursor-pointer"
            onClick={() => handleCommentClick(data?.id)}
          />
        </div>
        <div className="w-full text-sm">{likesInfo.likes} Likes</div>
        <div className="w-full text-sm">
          <span>Guest User: {data.caption}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
