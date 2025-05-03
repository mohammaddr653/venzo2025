export interface User {
  _id: string;
  email: string;
  name: string;
  avatar: string | null;
  isadmin: boolean;
  verified: boolean;
}
