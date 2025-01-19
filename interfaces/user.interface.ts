export interface UserSelf extends User {
  emails: [
    {
      emailType: string;
      address: string;
      verified: boolean;
    },
  ];
  remainingCredits: number;
  phone: {
    number: string;
    verified: boolean;
  };
}

export interface User {
  _id: string;
  aboutYou: string;
  displayname: string;
  brainetTag: string;
  visibility: string;
  projectIds: string[];
  followerIds: string[];
  followingIds: string[];
  dateOfBirth?: string;
  emails?: [
    {
      emailType: string;
      address: string;
      verified: boolean;
    },
  ];
  remainingCredits?: number;
  phone?: {
    number: string;
    verified: boolean;
  };
}
