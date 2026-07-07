export type SpvParticipant = {
  id: string;
  name: string;
  nim: string;
  clusterId: string;
  status: "active" | "inactive";
};

export type SpvTask = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "accepted" | "rejected";
  participantId: string;
};

// Ponytail note: Jonathan will implement the backend endpoints later. 
// We just prepare the API shape here for the frontend hooks.
