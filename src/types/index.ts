import { OutputFileEntry } from "@uploadcare/react-uploader";
import { User } from "firebase/auth";

export interface UserLogIn {
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FileEntry {
  files: OutputFileEntry[];
}

export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userLikes: string[];
  userId: string | null;
  date: Date;
}

export interface PhotoMeta {
  uuid: string;
  cdnUrl: string;
}

export interface DocumentResponse extends Post {
  id: string;
}

export interface LikesInfo {
  likes: number;
  isLiked: boolean;
}

export interface IProfileInfo {
  user: User;
  displayName: string | null;
  photoURL: string | null;
}

export interface IUserProfile {
  userId: string;
  displayName: string | null;
  photoURL: string | null;
  userBio: string;
}

export interface IProfileResponse extends IUserProfile {
  id: string;
}

export interface IComment {
  parentCommentId: string | null;
  postId: string;
  text: string;
  usersLiked: string[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentResponse extends IComment {
  id: string;
}
