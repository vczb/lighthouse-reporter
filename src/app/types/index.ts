export type Error = {
  [key: string]: unknown;
};

export type UserProps = {
  id: string;
  email: string;
  password: string;
};

export type GroupProps = {
  user: any;
  name: string;
  pages: string[];
};
