import { db } from "@/firebaseConfig";
import { IComment, ICommentResponse } from "@/types";
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

const COLLECTION_NAME = "comments";

export const createComment = (comment: IComment) => {
  return addDoc(collection(db, COLLECTION_NAME), comment);
};

export const getCommentsByPost = async (postId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("postId", "==", postId),
      orderBy("updatedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const tempArr: ICommentResponse[] = [];
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as IComment;
        const responseObj: ICommentResponse = {
          id: doc.id,
          ...data,
        };
        tempArr.push(responseObj);
      });
      return tempArr;
    }
  } catch (error) {
    console.log("Error while fetching comments!", error);
  }
};

export const updateLikesOnComment = (
  id: string,
  usersLiked: string[],
  likes: number
) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(docRef, {
    likes,
    usersLiked,
  });
};

export const updateComment = (id: string, commentText: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(docRef, {
    text: commentText,
    updatedAt: new Date(),
  });
};

export const deleteComment = async (id: string) => {
  const commentRef = doc(db, COLLECTION_NAME, id);
  // Get the comment document to check if it's a reply or a top-level comment
  const commentSnapshot = await getDoc(commentRef);

  if (!commentSnapshot.exists()) {
    return;
  }

  const commentData = commentSnapshot.data();
  const parentCommentId = commentData.parentCommentId || null;

  // If it's a top-level comment (i.e., `parentCommentId` is null or undefined)
  if (!parentCommentId) {
    // Find all replies where parentCommentId matches this comment id
    const repliesQuery = query(
      collection(db, COLLECTION_NAME),
      where("parentCommentId", "==", id)
    );
    const repliesSnapshot = await getDocs(repliesQuery);

    // Delete all replies
    const deleteReplies = repliesSnapshot.docs.map((replyDoc) =>
      deleteDoc(doc(db, COLLECTION_NAME, replyDoc.id))
    );
    await Promise.all(deleteReplies); // Ensure all replies are deleted before moving on
  }
  // Delete the main comment
  await deleteDoc(commentRef);
};
