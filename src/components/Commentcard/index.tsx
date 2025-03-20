import { useEffect, useRef, useState } from "react";
import { Heart, Trash2, MessageCircle, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import Spinner from "../loader";
import { Textarea } from "../ui/textarea";
import { createComment, updateComment } from "@/repository/comment.service";
import { Card, CardHeader, CardTitle } from "../ui/card";
import image1 from "@/assets/images/image1.jpg";
import { useUsers } from "@/context/usersContext";

const CommentCard = ({
  id = "",
  parentCommentId = "",
  text = "",
  likes = 0,
  usersLiked = [],
  userId = "",
  handleDelete = () => {},
  handleLike = () => {},
  handleEditComment = (e: React.MouseEvent<HTMLFormElement>) => {},
  handleCommentReply = (e: React.MouseEvent<HTMLFormElement>) => {},
  handleReplyEditCancel = (e: React.MouseEvent<HTMLFormElement>) => {},
  handleRepiesToggle = () => {},
  loading = false,
  isLiked = false,
  editCommentIds = [],
  replyCommentIds = [],
  currentPostId = "",
  isAReply = false,
  setComments,
  setEditCommentIds,
  setReplyCommentIds,
  openReplyIds,
}) => {
  const { users, loading: usersLoading } = useUsers();
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const replyTextRef = useRef(null);

  const isEditing = editCommentIds.includes(id);
  const isReplying = replyCommentIds.includes(id);

  const getUser = () => users?.find((user) => user.userId === userId);
  const userDetails = getUser();

  useEffect(() => {
    if (!replyTextRef?.current) return;
    replyTextRef.current.focus();
  }, [replyTextRef?.current]);

  useEffect(() => {
    if (isEditing) setReplyText(text);
    if (isReplying) setReplyText("");
  }, [isEditing, isReplying]);

  const handleReplyKeydown = (
    e: React.KeyboardEvent<HTMLFormElement>,
    commentId
  ) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleUserReply(e, id);
    }
  };

  const handleUserReply = async (
    e: React.MouseEvent<HTMLFormElement> | React.KeyboardEvent<HTMLFormElement>,
    commentId
  ) => {
    e.preventDefault();
    if (!parentCommentId || !commentId) return;
    try {
      const replyText_ = replyText.trim();
      if (replyText_ === "") {
        throw Error("You cannot add emty comment!");
      }
      setReplyLoading(true);
      if (editCommentIds.includes(commentId)) {
        setComments((prev) => {
          return prev.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                text: replyText_,
              };
            }
            return comment;
          });
        });
        await updateComment(commentId, replyText_);
        setEditCommentIds((prev) => {
          const updatedArray = [...prev];
          updatedArray.splice(prev.indexOf(commentId), 1);
          return updatedArray;
        });
      }
      if (replyCommentIds.includes(commentId)) {
        const newComment: IComment = {
          parentCommentId: parentCommentId,
          postId: currentPostId,
          text: replyText_,
          usersLiked: [],
          likes: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await createComment(newComment);
        setComments((prev) => [
          ...prev,
          {
            id: "",
            ...newComment,
          },
        ]);
        setReplyCommentIds((prev) => {
          const updatedArray = [...prev];
          updatedArray.splice(prev.indexOf(commentId), 1);
          return updatedArray;
        });
        if (!openReplyIds.includes(commentId)) handleRepiesToggle(commentId);
      }
    } catch (error) {
      console.log("Error while replying: ", error);
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col pl-3">
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
      </div>
      <div className="flex gap-3 px-4 py-2 border-b border-gray-200 items-center relative">
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        )}
        {/* Profile Image */}
        {/* <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        /> */}

        {/* Comment Content */}
        <div className="flex-1">
          {/* <p className="font-semibold text-sm">{username}</p> */}
          <p className="text-gray-700 text-sm ml-4">{text}</p>

          {/* Bottom Actions */}
          <div className="flex justify-between mt-2 text-gray-500 text-xs">
            <div className="flex gap-3">
              <Button
                onClick={handleEditComment}
                className={`bg-transparent! text-black hover:text-gray-500 flex items-center gap-1 p-0! cursor-pointer ${
                  isEditing ? "text-gray-500" : "text-black"
                }`}
              >
                <Pencil size={14} />
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-transparent! text-black hover:text-red-500 flex items-center gap-1 p-0! cursor-pointer"
              >
                <Trash2 size={14} />
                Delete
              </Button>
              <Button
                onClick={handleCommentReply}
                className={`bg-transparent! hover:text-blue-500 flex items-center gap-1 p-0! cursor-pointer ${
                  isReplying ? "text-blue-500" : "text-black"
                }`}
              >
                <MessageCircle size={14} />
                Reply
              </Button>
              {!isAReply && (
                <Button
                  onClick={handleRepiesToggle}
                  className={`bg-transparent! hover:text-blue-500 flex items-center gap-1 p-0! cursor-pointer ${
                    openReplyIds.includes(id) ? "text-blue-500" : "text-black"
                  }`}
                >
                  <MessageCircle size={14} />
                  Replies
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Like Button */}
        <Button
          onClick={handleLike}
          className={`ml-auto bg-transparent! p-0! cursor-pointer w-fit h-fit text-gray-500 group hover:text-red-500${
            usersLiked.includes(userId) || isLiked ? " text-red-500" : ""
          }`}
        >
          <Heart
            size={20}
            className={`group-hover:fill-red-500 ${
              usersLiked.includes(userId) || isLiked ? "fill-red-500" : ""
            }`}
          />
          <span className="text-black!">{likes} Likes</span>
        </Button>
      </div>
      {(isReplying || isEditing) && (
        <div
          className={`relative mt-4 flex flex-col justify-center items-end gap-4${
            !isAReply ? " ml-16" : ""
          }`}
        >
          {replyLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Spinner color="" />
            </div>
          )}
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => handleReplyKeydown(e, id)}
            ref={replyTextRef}
            className="text-lg! text-gray-500 rounded-none! border-0 border-b-2 border-gray-950 resize-none field-sizing-content h-fit min-h-fit box-shadow-none px-2! py-0!"
          />
          <div className="flex justify-start items-center gap-4">
            <Button onClick={handleReplyEditCancel} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              onClick={(e) => handleUserReply(e, id)}
              className={`cursor-pointer ${
                isEditing
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isEditing ? "Edit" : "Reply"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
