import { db } from "@/firebaseConfig";
import { DocumentResponse, Post } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "post";

export const createPost = (post: Post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const tempArr: DocumentResponse[] = [];
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Post;
        const responseObj: DocumentResponse = {
          id: doc.id,
          ...data,
        };
        tempArr.push(responseObj);
      });
      return tempArr;
    }
  } catch (error) {
    console.log("Error while fetching posts!", error);
  }
  return null;
};

export const getPostsByUserId = (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
  return getDocs(q);
};

export const getPost = (id: string) => {
  return getDoc(doc(db, COLLECTION_NAME, id));
};

export const deletePost = (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return deleteDoc(docRef);
};

export const updateLikesOnPost = (
  id: string,
  userLikes: string[],
  likes: number
) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(docRef, {
    likes,
    userLikes,
  });
};
