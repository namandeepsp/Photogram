import { db } from "@/firebaseConfig";
import { IProfileResponse, IUserProfile } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "users";

export const createUserProfile = (user: IUserProfile) => {
  try {
    return addDoc(collection(db, COLLECTION_NAME), user);
  } catch (error) {
    console.log("Error while creating user: ", error);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );
    const querySnapShot = await getDocs(q);
    let tempData: IProfileResponse | null = null;
    if (querySnapShot.size > 0) {
      querySnapShot.forEach((doc) => {
        const userData = doc.data() as IUserProfile;
        tempData = {
          id: doc.id,
          ...userData,
        };
      });
      return tempData;
    } else {
      return tempData;
    }
  } catch (error) {
    console.log("Error while getting user: ", error);
  }
  return null;
};

export const updateUserProfile = async (id: string, user: IUserProfile) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
      ...user,
    });
  } catch (error) {
    console.log("Error while updating user: ", error);
  }
};

export const getAllUsers = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    const tempArr: IProfileResponse[] = [];
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as IUserProfile;
        const responseObj: IProfileResponse = {
          id: doc.id,
          ...data,
        };
        tempArr.push(responseObj);
      });
      return tempArr;
    }
  } catch (error) {
    console.log("Error occured while getting all the users: ", error);
  }
};
