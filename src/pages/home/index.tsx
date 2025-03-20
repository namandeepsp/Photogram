import CommentCard from "@/components/Commentcard";
import CustomModal from "@/components/commonComponents/CustomModal";
import Layout from "@/components/layout";
import Spinner from "@/components/loader";
import PostCard from "@/components/postCard";
import Stories from "@/components/stories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userAuthContext";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  updateLikesOnComment,
} from "@/repository/comment.service";
import { getPosts } from "@/repository/post.service";
import { DocumentResponse, IComment, ICommentResponse } from "@/types";
import { Search, Send } from "lucide-react";
import { FunctionComponent, useEffect, useRef, useState } from "react";

interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = () => {
  const { user } = useUserAuth();
  const [data, setData] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [commentsOpen, setCommentOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<ICommentResponse[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [loadingCommentId, setLoadingCommentId] = useState("");
  const [editCommentIds, setEditCommentIds] = useState([]);
  const [replyCommentIds, setReplyCommentIds] = useState([]);
  const [openReplyIds, setOpenReplyIds] = useState([]);
  const commentTextareaRef = useRef(null);

  useEffect(() => {
    if (user !== null) {
      getAllPosts();
    }
  }, []);

  useEffect(() => {
    getAllCommentsForAPost();
  }, [currentPostId, comments?.length]);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response: DocumentResponse[] = (await getPosts()) || [];
      setData(response);
    } catch (err) {
      console.log("Error while fetching posts: ", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllCommentsForAPost = async () => {
    if (!currentPostId) return;
    try {
      setCommentsLoading(true);
      const postComments = await getCommentsByPost(currentPostId);
      if (postComments?.length) setComments(postComments);
      else setComments([]);
    } catch (error) {
      console.log("Error while fetching comments: ", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const renderPosts = () =>
    data?.map((item) => (
      <PostCard
        data={item}
        setData={setData}
        key={item.id}
        setCommentOpen={setCommentOpen}
        setCurrentPostId={setCurrentPostId}
        setComments={setComments}
      />
    ));

  const renderComments = () => {
    return comments
      .filter((comment) => !comment.parentCommentId)
      ?.map(({ id, parentCommentId = null, text, likes, usersLiked }) => {
        const commentReplies = comments.filter(
          (comment) => comment.parentCommentId === id
        );
        return (
          <div key={id}>
            <CommentCard
              id={id}
              parentCommentId={id}
              text={text}
              likes={likes}
              usersLiked={usersLiked}
              userId={user?.uid}
              handleDelete={() => handleCommentDelete(id)}
              handleLike={() =>
                handleCommentLike(id, !usersLiked?.includes(user?.uid))
              }
              handleEditComment={(e: React.MouseEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleCommentEdit(id);
              }}
              handleCommentReply={(e: React.MouseEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleCommentReply(id);
              }}
              handleReplyEditCancel={(e: React.MouseEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (editCommentIds.includes(id)) {
                  setEditCommentIds((prev) => {
                    const updatedArray = [...prev];
                    updatedArray.splice(prev.indexOf(id), 1);
                    return updatedArray;
                  });
                }
                if (replyCommentIds.includes(id)) {
                  setReplyCommentIds((prev) => {
                    const updatedArray = [...prev];
                    updatedArray.splice(prev.indexOf(id), 1);
                    return updatedArray;
                  });
                }
              }}
              handleRepiesToggle={() => handleRepiesToggle(id)}
              loading={loadingCommentId === id}
              isLiked={usersLiked?.includes(user?.uid)}
              editCommentIds={editCommentIds}
              replyCommentIds={replyCommentIds}
              currentPostId={currentPostId}
              setComments={setComments}
              setEditCommentIds={setEditCommentIds}
              setReplyCommentIds={setReplyCommentIds}
              openReplyIds={openReplyIds}
            />
            {commentReplies?.length > 0 && openReplyIds.includes(id) && (
              <div className="ml-16">
                {commentReplies?.map((reply) => {
                  return (
                    <CommentCard
                      key={reply.id}
                      id={reply.id}
                      parentCommentId={id}
                      text={reply.text}
                      likes={reply.likes}
                      usersLiked={reply.usersLiked}
                      userId={user?.uid}
                      handleDelete={() => handleCommentDelete(reply.id)}
                      handleLike={() =>
                        handleCommentLike(
                          reply.id,
                          !reply.usersLiked?.includes(user?.uid)
                        )
                      }
                      handleEditComment={(
                        e: React.MouseEvent<HTMLFormElement>
                      ) => {
                        e.preventDefault();
                        handleCommentEdit(reply.id);
                      }}
                      handleCommentReply={(
                        e: React.MouseEvent<HTMLFormElement>
                      ) => {
                        e.preventDefault();
                        handleCommentReply(reply.id);
                      }}
                      handleReplyEditCancel={(
                        e: React.MouseEvent<HTMLFormElement>
                      ) => {
                        e.preventDefault();
                        if (editCommentIds.includes(reply.id)) {
                          setEditCommentIds((prev) => {
                            const updatedArray = [...prev];
                            updatedArray.splice(prev.indexOf(reply.id), 1);
                            return updatedArray;
                          });
                        }
                        if (replyCommentIds.includes(reply.id)) {
                          setReplyCommentIds((prev) => {
                            const updatedArray = [...prev];
                            updatedArray.splice(prev.indexOf(reply.id), 1);
                            return updatedArray;
                          });
                        }
                      }}
                      loading={loadingCommentId === reply.id}
                      isLiked={usersLiked?.includes(user?.uid)}
                      editCommentIds={editCommentIds}
                      replyCommentIds={replyCommentIds}
                      currentPostId={currentPostId}
                      setComments={setComments}
                      setEditCommentIds={setEditCommentIds}
                      setReplyCommentIds={setReplyCommentIds}
                      isAReply={true}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      });
  };
  const handleCommentKeydown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleUserComment(e);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!confirm("This action is not reversible. Do you want to continue?"))
      return;
    try {
      setLoadingCommentId(commentId);
      setCommentsLoading(true);
      await deleteComment(commentId);
      getAllCommentsForAPost();
    } catch (error) {
      console.log("Error happened while deleting comment!: ", error);
    } finally {
      setLoadingCommentId("");
      setCommentsLoading(false);
    }
  };

  const handleCommentLike = async (commentId: string, isLiked = false) => {
    if (!user?.uid) return;
    try {
      setLoadingCommentId(commentId);
      const comment = comments.find((comment) => comment.id === commentId);
      if (!comment) return;
      const updatedUsersLiked =
        comment?.usersLiked instanceof Array ? [...comment?.usersLiked] : [];
      if (isLiked) updatedUsersLiked.push(user?.uid);
      else updatedUsersLiked.splice(updatedUsersLiked?.indexOf(user?.uid), 1);
      const updatedLikes = comment?.likes + (isLiked ? 1 : -1);
      if (comment) {
        setComments((prev) => {
          return prev.map((comment_, index) => {
            const commentIndex = comments?.indexOf(comment);
            if (commentIndex === index) {
              return {
                ...comment_,
                usersLiked: updatedUsersLiked,
                likes: updatedLikes,
              };
            }
            return comment_;
          });
        });
        await updateLikesOnComment(commentId, updatedUsersLiked, updatedLikes);
      }
    } catch (error) {
      console.log("Error while updating comment likes: ", error);
    } finally {
      setLoadingCommentId("");
    }
  };

  const handleCommentEdit = async (commentId: string) => {
    if (replyCommentIds.includes(commentId)) return;
    const editComment = comments.find((comment) => comment.id === commentId);
    if (!editComment) return;
    try {
      if (editCommentIds.includes(commentId))
        setEditCommentIds((prev) => {
          const updatedArray = [...prev];
          updatedArray.splice(prev.indexOf(editComment), 1);
          return updatedArray;
        });
      else setEditCommentIds((prev) => [...prev, commentId]);
    } catch (error) {
      console.log("Error while editing comment: ", error);
    }
  };

  const handleCommentReply = async (commentId: string) => {
    if (editCommentIds.includes(commentId)) return;
    const replyComment = comments.find((comment) => comment.id === commentId);
    if (!replyComment) return;
    try {
      if (replyCommentIds.includes(commentId))
        setReplyCommentIds((prev) => {
          const updatedArray = [...prev];
          updatedArray.splice(prev.indexOf(replyComment), 1);
          return updatedArray;
        });
      else setReplyCommentIds((prev) => [...prev, commentId]);
    } catch (error) {
      console.log("Error while replying comment: ", error);
    }
  };

  const handleUserComment = async (
    e: React.MouseEvent<HTMLFormElement> | React.KeyboardEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const commentText = comment.trim();
      if (commentText === "") {
        throw Error("You cannot add emty comment!");
      }
      setCommentsLoading(true);
      const newComment: IComment = {
        parentCommentId: null,
        postId: currentPostId,
        text: commentText,
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
      setComment("");
    } catch (error) {
      console.log("Error while creating comment: ", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleCommentClose = async () => {
    setCommentOpen(false);
    setReplyCommentIds([]);
    setEditCommentIds([]);
  };

  const handleRepiesToggle = (commentId) => {
    setOpenReplyIds((prev) => {
      const updatedOpenReplyIds = [...prev];
      const index = updatedOpenReplyIds.indexOf(commentId);
      if (index > -1) updatedOpenReplyIds.splice(index, 1);
      else updatedOpenReplyIds.push(commentId);
      return updatedOpenReplyIds;
    });
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="relative mb-6 w-full text-gray-600">
          <Input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-sm text-base focus:outline-none"
            placeholder="search"
            type="search"
            name="search"
          />
          <button
            title="search"
            type="submit"
            className="absolute right-2 5 top-2 5"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="mb-5 overflow-y-auto">
          <h2 className="mb-5">Stories</h2>
          <Stories />
        </div>
        <div className="mb-5">
          <h2 className="mb-5">Feed</h2>
          <div className="w-full flex justify-center">
            <div className="flex flex-col max-w-sm-rounded-sm overflow-hidden">
              {loading ? (
                <Spinner color="" />
              ) : data?.length ? (
                renderPosts()
              ) : (
                <p>Post added by users will be shown here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Comments Modal */}
      <CustomModal
        onClose={handleCommentClose}
        isOpen={commentsOpen}
        modalTitle="Comments"
      >
        <div
          className={`min-h-64 mt-0 mb-4${
            !comments?.length ? " text-center" : " max-h-64 overflow-auto"
          }`}
        >
          {/* {commentsLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner color="" />
              </div>
            )} */}
          {comments?.length ? (
            renderComments()
          ) : (
            <>
              <p className="text-lg">No comments yet.</p>
              <h3 className="text-slate-500 text-2xl">
                Start the Conversation...
              </h3>
            </>
          )}
        </div>
        <form
          onSubmit={handleUserComment}
          onKeyDown={handleCommentKeydown}
          className="mb-4"
        >
          <div className="flex justify-between items-end gap-4 w-full border-b-2 border-gray-950 mx-auto relative px-2">
            {commentsLoading && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Spinner color="" />
              </div>
            )}
            <Textarea
              ref={commentTextareaRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your view here..."
              className="text-lg! text-gray-500 rounded-none! border-0 border-gray-950 resize-none field-sizing-content h-fit min-h-fit box-shadow-none px-2! py-0!"
            />
            <Button
              type="submit"
              className="bg-transparent! border-0 p-1! w-fit h-fit box-shadow-none cursor-pointer group hover:bg-slate-600!"
              disabled={comment?.trim() === "" || commentsLoading}
            >
              <Send className="text-slate-600 group-hover:text-white w-[23px] h-[23px]" />
            </Button>
          </div>
        </form>
      </CustomModal>
    </Layout>
  );
};

export default Home;
