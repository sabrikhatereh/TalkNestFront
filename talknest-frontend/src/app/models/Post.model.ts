
export interface Result<T> {
    isSuccess: boolean;
    isFailure: boolean;
    error: any;
    errors: any[];
    value: T;
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    comments?: Comment[];
  }
  export interface Comment {
    id?: string;
    postId: string;
    text: string;
  }