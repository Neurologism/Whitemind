export interface User {
  _id: string;
  brainetTag: string;
  emails: [
    {
      emailType: string;
      address: string;
      verified: boolean;
    },
  ];
  phone: {
    number: string;
    verified: boolean;
  };
  aboutYou: string;
  displayname: string;
  dateOfBirth: string;
  visibility: string;
  projectIds: string[];
  followerIds: string[];
  followingIds: string[];
}
