export type AnnouncementRow = {
  id: string;
  title: string;
  desc: string;
  targetType: "ALL" | "SPV" | "MABA";
  createdBy: string;
  createdAt: string;
  isRead: boolean;
};

export type CreateAnnouncementInput = {
  title: string;
  desc: string;
  targetType: "ALL" | "SPV" | "MABA";
};

export type AnnouncementFilters = {
  page: number;
  limit: number;
  unreadOnly?: boolean;
};

export type PaginatedAnnouncements = {
  data: AnnouncementRow[];
  total: number;
  page: number;
  limit: number;
};
