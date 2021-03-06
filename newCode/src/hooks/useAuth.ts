import { navigate } from "gatsby-link";
import { useMoralis } from "./useMoralis";

export function useAuth() {
  const { Moralis } = useMoralis();
  return {
    login: async () => {
      try {
        await Moralis?.Web3.authenticate({signingMessage:"hello"});
        //navigate("/");
      } catch (e: any) {
        console.error(e.message, e);
      }
    },

    logout: async () => {
      try {
        await Moralis?.User.logOut();
        //navigate("/login");
      } catch (e: any) {
        console.error(e.message, e);
      }
    },

    currentUser: () => {
      return Moralis?.User.current();
    },
  };
}
