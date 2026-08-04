import { clientApi } from "@/lib/api/client";

export type PresignedUploadResult = {
  uploadUrl: string;
  key: string;
  publicUrl: string;
};

export type UploadPrefix = "avatars" | "events" | "twibbons" | "gallery" | "submissions";

export function requestPresignedUrl(opts: {
  prefix: UploadPrefix;
  filename: string;
  contentType: string;
  size: number;
}) {
  return clientApi.post<PresignedUploadResult>("/uploads/presigned", opts);
}

export async function uploadFileToS3(file: File, prefix: UploadPrefix): Promise<PresignedUploadResult> {
  const { data } = await requestPresignedUrl({
    prefix,
    filename: file.name,
    contentType: file.type || "application/octet-stream",
    size: file.size,
  });

  const res = await fetch(data.uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type || "application/octet-stream" },
  });

  if (!res.ok) {
    throw new Error("Gagal mengunggah file");
  }

  return data;
}
