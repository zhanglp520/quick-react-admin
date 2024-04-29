import { RootState } from "@/store";
import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth.quickAccessToken) {
    return true;
  }
};

export default useAuth;
