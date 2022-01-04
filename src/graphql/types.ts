export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSEmail: string;
  AWSPhone: string;
  AWSTimestamp: number;
  AWSURL: string;
};

export enum Blockchain_Update_Status {
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export enum Category {
  Art = 'ART',
  Gaming = 'GAMING'
}

export enum Contract_Type {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155'
}

export enum Listing_Type {
  Auction = 'AUCTION',
  Sell = 'SELL'
}

export type Mutation = {
  __typename?: 'Mutation';
  authenticate: Scalars['String'];
  followUser: Scalars['String'];
  listNft: NftListing;
  refreshAccessToken: Scalars['String'];
  signup: UserAuthData;
  updateProfile: User;
};


export type MutationAuthenticateArgs = {
  address: Scalars['ID'];
  signature: Scalars['String'];
};


export type MutationFollowUserArgs = {
  input: FollowUserInput;
};


export type MutationListNftArgs = {
  input: ListNftInput;
};


export type MutationSignupArgs = {
  address: Scalars['ID'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type Nft = {
  __typename?: 'Nft';
  amount?: Maybe<Scalars['String']>;
  blockNumber?: Maybe<Scalars['Int']>;
  blockNumberMinted?: Maybe<Scalars['Int']>;
  contractType?: Maybe<Contract_Type>;
  metadata?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftAddress?: Maybe<Scalars['ID']>;
  symbol?: Maybe<Scalars['String']>;
  syncedAt?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  tokenUri?: Maybe<Scalars['String']>;
};

export type NftListing = {
  amount: Scalars['Int'];
  blockChainUpdateStatus: Blockchain_Update_Status;
  category: Array<Category>;
  contractType: Contract_Type;
  listedBy_publicAddress: Scalars['ID'];
  listedBy_username: Scalars['ID'];
  listingType: Listing_Type;
  tags?: Maybe<Array<Scalars['String']>>;
  tokenUri?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  authUser: AuthUserOutput;
  findUser: UserAuthData;
  getListedNfts: GetListedNftsOutput;
  getNftInfo: Nft;
  getNftOwners: GetNftOwnersOutput;
  getUserProfile: User;
  getUsersNfts: GetUsersNftsOutput;
  indexNftAddress: Scalars['String'];
  usernameAvailable: Scalars['Boolean'];
};


export type QueryFindUserArgs = {
  address: Scalars['ID'];
};


export type QueryGetListedNftsArgs = {
  input: GetListedNftsInput;
};


export type QueryGetNftInfoArgs = {
  input: GetNftInfoInput;
};


export type QueryGetNftOwnersArgs = {
  input: GetNftOwnersInput;
};


export type QueryGetUserProfileArgs = {
  input: GetUserProfileInput;
};


export type QueryGetUsersNftsArgs = {
  input: GetUsersNftsInput;
};


export type QueryIndexNftAddressArgs = {
  input: IndexNftAddressInput;
};


export type QueryUsernameAvailableArgs = {
  username: Scalars['String'];
};

export type AuthUserOutput = {
  __typename?: 'authUserOutput';
  userAuthData: UserAuthData;
  userData: User;
};

export type FollowUserInput = {
  publicAddress: Scalars['ID'];
};

export type GetListedNftsInput = {
  category?: InputMaybe<Array<Category>>;
  listingType?: InputMaybe<Listing_Type>;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type GetListedNftsOutput = {
  __typename?: 'getListedNftsOutput';
  count: Scalars['Int'];
  data: Array<NftListing>;
};

export type GetNftInfoInput = {
  nftAddress: Scalars['String'];
  tokenId: Scalars['String'];
};

export type GetNftOwnersInput = {
  nftAddress: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  tokenId: Scalars['String'];
};

export type GetNftOwnersOutput = {
  __typename?: 'getNftOwnersOutput';
  count: Scalars['Int'];
  data: Array<Maybe<User>>;
};

export type GetUserProfileInput = {
  publicAddress: Scalars['ID'];
};

export type GetUsersNftsInput = {
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  userPublicAddress: Scalars['ID'];
};

export type GetUsersNftsOutput = {
  __typename?: 'getUsersNftsOutput';
  count: Scalars['Int'];
  data: Array<Maybe<Nft>>;
};

export type IndexNftAddressInput = {
  nftAddress: Scalars['String'];
};

export type ListNftInput = {
  amount: Scalars['Int'];
  auctionEndingDate?: InputMaybe<Scalars['AWSTimestamp']>;
  basePrice?: InputMaybe<Scalars['Int']>;
  category: Array<Category>;
  contractAddress: Scalars['String'];
  contractType: Contract_Type;
  listingType: Listing_Type;
  sellPrice?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  tokenId: Scalars['String'];
};

export type NftAuctionListing = NftListing & {
  __typename?: 'nftAuctionListing';
  amount: Scalars['Int'];
  auctionEndingDate: Scalars['AWSTimestamp'];
  basePrice?: Maybe<Scalars['Int']>;
  blockChainUpdateStatus: Blockchain_Update_Status;
  category: Array<Category>;
  contractType: Contract_Type;
  highestBid?: Maybe<Scalars['Int']>;
  listedBy_publicAddress: Scalars['ID'];
  listedBy_username: Scalars['ID'];
  listingType: Listing_Type;
  tags?: Maybe<Array<Scalars['String']>>;
  tokenUri?: Maybe<Scalars['String']>;
};

export type NftSellListing = NftListing & {
  __typename?: 'nftSellListing';
  amount: Scalars['Int'];
  blockChainUpdateStatus: Blockchain_Update_Status;
  category: Array<Category>;
  contractType: Contract_Type;
  listedBy_publicAddress: Scalars['ID'];
  listedBy_username: Scalars['ID'];
  listingType: Listing_Type;
  sellPrice?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
  tokenUri?: Maybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  coverImage?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'user';
  bio?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  publicAddress?: Maybe<Scalars['ID']>;
  refId?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type UserAuthData = {
  __typename?: 'userAuthData';
  joiningDate?: Maybe<Scalars['AWSTimestamp']>;
  nonce?: Maybe<Scalars['String']>;
  publicAddress: Scalars['ID'];
  tokenExpiryDate?: Maybe<Scalars['AWSTimestamp']>;
};
