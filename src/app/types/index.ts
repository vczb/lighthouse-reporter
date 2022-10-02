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

export type TriggerCreateDto = {
  name: string;
  pages: string[];
  callbackUrl?: string;
}

export type TriggerDispatchDto = {
  name: string;
}

export interface TypedRequestBody<T> extends Express.Request {
  userId?: string;
  body: T;
}
