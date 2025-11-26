export type IQuestions = {
  id: number;
  title: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  answerE: string;
  correctAnswer: string;
  subject: Subject;
  createdBy: CreatedBy;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatedBy = {
  id: number;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

export type Authority = {
  authority: string;
};

export type Subject = {
  id: number;
  name: string;
};
