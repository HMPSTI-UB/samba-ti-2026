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
  termsConditions: string[];
  formFields: FormField[];
  status: "DRAFT" | "PUBLISHED";
  deadline: string;
  createdBy: string;
  createdAt: string;
};

export type Submission = {
  id: string;
  taskId: string;
  mabaId: string;
  mabaName: string;
  clusterName?: string | null;
  submissionData: Record<string, string>;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  feedback: string | null;
  submittedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description: string;
  termsConditions: string[];
  formFields: FormField[];
  status: "DRAFT" | "PUBLISHED";
  deadline: string;
};

export type UpdateTaskInput = Partial<CreateTaskInput> & { id: string };

export type MabaTaskStatus = "DONE" | "PENDING" | "REJECTED" | "NOT_SUBMITTED";

export type MabaTask = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  termsConditions: string[];
  formFields: FormField[];
  doneStatus: MabaTaskStatus;
};

export type MySubmission = {
  id: string;
  taskId: string;
  mabaId: string;
  submissionData: Record<string, string>;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  feedback: string | null;
  submittedAt: string;
};

export type MemberTask = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  termsConditions: string[];
  formFields: FormField[];
  doneStatus: MabaTaskStatus;
  submission: MySubmission | null;
};

export type MemberTasksData = {
  maba: {
    id: string;
    name: string;
    username: string | null;
    email: string;
    nim: string | null;
    gender: string | null;
    status: boolean;
    clusterId: string | null;
    clusterName: string | null;
  };
  tasks: MemberTask[];
};
