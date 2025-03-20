import FileUploader from "@/components/fileUploader/FileUploader";
import Layout from "@/components/layout";
import Spinner from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userAuthContext";
import {
  createUserProfile,
  updateUserProfile,
} from "@/repository/user.service";
import { IProfileInfo, IUserProfile } from "@/types";
import { Label } from "@radix-ui/react-label";
import { FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image2 from "../../assets/images/image2.jpg";

interface IEditProfileProps {}

const EditProfile: FunctionComponent<IEditProfileProps> = (props) => {
  const { user, updateProfileInfo } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id, userId, userBio, displayName, photoURL } = location.state;
  const [data, setData] = useState<IUserProfile>({
    userId,
    userBio,
    displayName,
    photoURL,
  });
  const [loading, setLoading] = useState(false);
  const [fileEntry, setFileEntry] = useState<FileEntry>({
    files: [],
  });
  const updateProfile = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!data?.displayName?.trim() || !data?.userBio?.trim()) {
        throw Error("Please fill all the fields first!");
      }
      const finalPhotoURL = fileEntry?.files?.[0]?.cdnUrl
        ? `${fileEntry?.files?.[0]?.cdnUrl}/-/preview/-/crop/face/200px200p/-/crop/1:1/center/-/border_radius/50p/`
        : data?.photoURL;
      if (id) {
        await updateUserProfile(id, {
          ...data,
          photoURL: finalPhotoURL,
        });
      } else {
        await createUserProfile({
          ...data,
          photoURL: finalPhotoURL,
        });
      }
      const userProfileInfo: IProfileInfo = {
        user: user!,
        displayName: data.displayName,
        photoURL: finalPhotoURL,
      };
      updateProfileInfo(userProfileInfo);
      navigate("/profile");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Edit Profile
          </h3>
          <div className="p-8">
            <form onSubmit={updateProfile}>
              <div className="flex-flex-col">
                <Label className="mb-4" htmlFor="photos">
                  Profile picture
                </Label>
                <div className="mb-4">
                  <img
                    src={
                      fileEntry?.files?.[0]?.cdnUrl
                        ? `${fileEntry?.files?.[0]?.cdnUrl}/-/preview/-/crop/face/200px200p/-/crop/1:1/center/-/border_radius/50p/`
                        : data?.photoURL || image2
                    }
                    alt="avatar"
                    className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                  />
                </div>
                <FileUploader
                  fileEntry={fileEntry}
                  onChange={setFileEntry}
                  multiple={false}
                  showPreview={false}
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="displayName">
                  User name
                </Label>
                <Input
                  className="mb-8 field-sizing-content resize-none max-h-60"
                  id="displayName"
                  placeholder="Enter your username..."
                  value={data?.displayName || ""}
                  onChange={(e) =>
                    setData({ ...data, displayName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="userBio">
                  User Bio
                </Label>
                <Textarea
                  className="mb-8 field-sizing-content resize-none max-h-60"
                  id="userBio"
                  placeholder="Add here what defines or motivates you..."
                  value={data?.userBio || ""}
                  onChange={(e) =>
                    setData({ ...data, userBio: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Button
                  className="mt-8 w-32 mr-8"
                  type="submit"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="mt-8 w-32 mr-8"
                  type="submit"
                >
                  {loading ? <Spinner /> : ""}
                  {loading ? "Saving ..." : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
