"use client";

import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "@/features/users/hooks/use-users";
import UserTable from "@/features/users/components/user-table";
import UserFilter from "@/features/users/components/user-filter";
import UserFormDialog from "@/features/users/components/user-form";
import UserDeleteDialog from "@/features/users/components/user-delete-dialog";
import type { SafeUser } from "@/features/users/api/users";

const LIMIT = 20;

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SafeUser | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<SafeUser | null>(null);

  const { data, isLoading } = useUsers({ search, role, status, page, limit: LIMIT });

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();
  const { success: alertSuccess, error: alertError } = useSweetAlert();

  const handleCreate = useCallback(
    (formData: any) => {
      createMutation.mutate(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
          nim: formData.nim || undefined,
          role: formData.role,
        },
        {
          onSuccess: () => {
            alertSuccess("User berhasil dibuat");
            setFormOpen(false);
          },
          onError: (err: Error) => {
            alertError(err.message);
          },
        },
      );
    },
    [createMutation, alertSuccess, alertError],
  );

  const handleUpdate = useCallback(
    (formData: any) => {
      if (!editingUser) return;
      updateMutation.mutate(
        { id: editingUser.id, data: { name: formData.name, email: formData.email, password: formData.password || undefined } },
        {
          onSuccess: () => {
            alertSuccess("User berhasil diupdate");
            setFormOpen(false);
            setEditingUser(null);
          },
          onError: (err: Error) => {
            alertError(err.message);
          },
        },
      );
    },
    [editingUser, updateMutation, alertSuccess, alertError],
  );

  const handleDelete = useCallback(() => {
    if (!deletingUser) return;
    deleteMutation.mutate(deletingUser.id, {
      onSuccess: () => {
        alertSuccess("User berhasil dihapus");
        setDeleteOpen(false);
        setDeletingUser(null);
      },
      onError: (err: Error) => {
        alertError(err.message);
      },
    });
  }, [deletingUser, deleteMutation, alertSuccess, alertError]);

  const openEdit = useCallback((user: SafeUser) => {
    setEditingUser(user);
    setFormOpen(true);
  }, []);

  const openDelete = useCallback((user: SafeUser) => {
    setDeletingUser(user);
    setDeleteOpen(true);
  }, []);

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-soft-white">Manajemen User</h1>
          <p className="text-sm text-muted-text mt-1">Kelola semua akun pengguna</p>
        </div>
        <Button variant="primary" onClick={() => { setEditingUser(null); setFormOpen(true); }}>
          <Plus className="w-4 h-4" />
          Tambah User
        </Button>
      </div>

      <UserFilter
        search={search}
        role={role}
        status={status}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        onRoleChange={(v) => { setRole(v); setPage(1); }}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
      />

      <div className="rounded-xl border border-white/10 bg-card-bg overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-text">Memuat data...</div>
        ) : (
          <UserTable
            data={data?.data ?? []}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        )}
        <Pagination
          page={page}
          totalPages={totalPages}
          total={data?.total ?? 0}
          onPageChange={setPage}
        />
      </div>

      <UserFormDialog
        open={formOpen}
        onOpenChange={(v) => { setFormOpen(v); if (!v) setEditingUser(null); }}
        editingUser={editingUser}
        onSubmit={editingUser ? handleUpdate : handleCreate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      <UserDeleteDialog
        open={deleteOpen}
        onOpenChange={(v) => { setDeleteOpen(v); if (!v) setDeletingUser(null); }}
        user={deletingUser}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
