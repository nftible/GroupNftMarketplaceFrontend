export function useMoralis() {
  // Moralis Initialization
  let Moralis;
  if (typeof window !== `undefined`) {
    Moralis = require("moralis");
    // Moralis.initialize(process.env.GATSBY_MORALIS_APPLICATION_ID);
    // Moralis.serverURL = process.env.GATSBY_MORALIS_SERVER_ID;

       Moralis.initialize("WrueTt5IpbHLoYTzseaLRZSJ3re9MjHK4TESs1OP");
    Moralis.serverURL = "https://yzmwwfpsjqeh.usemoralis.com:2053/server";


// const serverUrl = "https://yzmwwfpsjqeh.usemoralis.com:2053/server";
// const appId = "WrueTt5IpbHLoYTzseaLRZSJ3re9MjHK4TESs1OP";
  }
  return { Moralis };
}
