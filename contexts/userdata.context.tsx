import { createContext } from "react";
import { UserDataType } from "../types/profile.types";

const UserDataContext = createContext<{
    userData: UserDataType | undefined;
    setuserData: (userData: UserDataType) => void;
} | null>(null);

export default UserDataContext;
