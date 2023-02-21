export enum CRUD {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface LoginType {
  email: string;
  password: string;
}

export interface SignUpType {
  confirmPassword: string;
  email: string;
  password: string;
  username: string;
}

export interface AllUser {
  avatar_url?: string | null;
  created_at: string;
  email: string;
  firstname: string;
  id?: number;
  lastname: string;
  phonenumber: string;
}

export interface MessagesType {
  content: string;
  created_at: string;
  id: string;
  profile_id: string;
  username: string;
}
