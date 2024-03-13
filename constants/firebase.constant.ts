import firestore from "@react-native-firebase/firestore";
// import database from "@react-native-firebase/database";

export const UserCollection = firestore().collection("Book-V-Users");
