import CustomModal from "@/components/commonComponents/CustomModal";
import FileUploader from "@/components/fileUploader/FileUploader";
import Layout from "@/components/layout";
import Spinner from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userAuthContext";
import { createPost } from "@/repository/post.service";
import { FileEntry, PhotoMeta, Post } from "@/types";
import { Label } from "@radix-ui/react-label";
import { FunctionComponent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICreatePostProps {}

const CreatePost: FunctionComponent<ICreatePostProps> = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = useState<FileEntry>({
    files: [],
  });
  const [post, setPost] = useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileEntry?.files?.length || user === null) return;
    setLoading(true);
    const photoMeta: PhotoMeta[] = fileEntry.files.map(({ cdnUrl, uuid }) => ({
      cdnUrl,
      uuid,
    }));
    const newPost = {
      ...post,
      userId: user.uid,
      photos: photoMeta,
    };
    try {
      await createPost(newPost);
    } catch (error) {
      console.log("Error while creating post: ", error);
    } finally {
      setLoading(false);
    }

    /* For navigating to home page to see the newly created post */
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Create Post
          </h3>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="caption">
                  Photo Caption
                </Label>
                <Textarea
                  className="mb-8 field-sizing-content resize-none max-h-60"
                  id="caption"
                  placeholder="What's in your photo!"
                  value={post.caption}
                  onChange={(e) =>
                    setPost({ ...post, caption: e.target.value })
                  }
                />
              </div>
              <div className="flex-flex-col">
                <Label className="mb-4" htmlFor="photos">
                  Photos
                </Label>
                <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
              </div>
              <Button className="mt-8 w-32" type="submit">
                {loading ? <Spinner color="" /> : "Post"}
                {loading ? "Loading..." : ""}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
