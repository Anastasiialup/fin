export type Profile = {
  id: number;
  username: string;
  email: string;
  password?: string;
  profileImage?: string | null;
  createdAt: string;
};
