export type FormField = {
  key: string;
  label: string;
  type: "text" | "textarea";
  isRequired: boolean;
  placeholder: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  termsConditions: string;
  formFields: FormField[];
  deadline: string;
  createdBy: string;
  createdAt: string;
};

export type Submission = {
  id: string;
  taskId: string;
  mabaId: string;
  mabaName: string;
  data: Record<string, string>;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  feedback: string | null;
  submittedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description: string;
  termsConditions: string;
  formFields: FormField[];
  deadline: string;
};
