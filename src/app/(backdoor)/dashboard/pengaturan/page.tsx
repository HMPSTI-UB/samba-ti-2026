"use client";

import { useState } from "react";
import { Download, Upload, Database, Info, Save, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { useMabaSeedExport } from "@/features/maba/hooks/use-maba";
import { useSettings, useUpdateSettings } from "@/features/settings/hooks/use-settings";
import { useUserStore } from "@/stores/user.store";
import SeedImportDialog from "./_components/seed-import-dialog";

export default function PengaturanPage() {
  const [importOpen, setImportOpen] = useState(false);
  const exportMutation = useMabaSeedExport();
  const { success: notifySuccess, error: notifyError } = useSweetAlert();

  const user = useUserStore((s) => s.user);
  const role = (user?.role ?? "").toUpperCase();
  const isKaderisasi = role === "KADERISASI" || role === "ADMIN";

  const { data: settingsRes } = useSettings({ enabled: isKaderisasi });
  const updateSettingsMutation = useUpdateSettings();
  const [lateMaxScore, setLateMaxScore] = useState<string | null>(null);
  const [scoreError, setScoreError] = useState("");

  const lateMaxScoreValue =
    lateMaxScore ?? (settingsRes?.data ? String(settingsRes.data.lateMaxScore) : "");

  function handleExport() {
    exportMutation.mutate(undefined, {
      onSuccess: () => notifySuccess("File CSV seed berhasil diunduh"),
      onError: (err: Error) => notifyError(err.message),
    });
  }

  function handleSaveScore() {
    const parsed = Number(lateMaxScoreValue);
    if (lateMaxScoreValue.trim() === "" || !Number.isInteger(parsed) || parsed < 0 || parsed > 100) {
      setScoreError("Nilai harus angka bulat 0–100");
      return;
    }
    setScoreError("");
    updateSettingsMutation.mutate(
      { lateMaxScore: parsed },
      {
        onSuccess: () => {
          notifySuccess("Pengaturan nilai berhasil disimpan");
          setLateMaxScore(null);
        },
        onError: (err: Error) => notifyError(err.message),
      },
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-soft-white">Pengaturan</h1>
        <p className="text-sm text-muted-text mt-1">Kelola pengaturan website & data</p>
      </div>

      {isKaderisasi && (
        <div className="rounded-xl border border-white/10 bg-card-bg p-6">
          <div className="flex items-center gap-3 mb-1">
            <SlidersHorizontal className="h-5 w-5 text-electric-blue" />
            <h2 className="text-lg font-bold text-soft-white">Penilaian</h2>
          </div>
          <p className="text-sm text-muted-text mb-5">
            Atur nilai default untuk tugas MABA yang dikumpulkan melewati tenggat (deadline). Nilai ini otomatis
            diberikan saat submission terlambat, dan masih dapat diubah manual oleh penilai.
          </p>

          <div className="flex flex-col gap-3 sm:max-w-xs">
            <Input
              label="Nilai Maksimal Keterlambatan (0–100)"
              type="number"
              min={0}
              max={100}
              placeholder="Contoh: 60"
              value={lateMaxScoreValue}
              error={scoreError}
              onChange={(e) => {
                setLateMaxScore(e.target.value);
                if (scoreError) setScoreError("");
              }}
            />
            <Button
              variant="primary"
              onClick={handleSaveScore}
              loading={updateSettingsMutation.isPending}
              className="gap-2 sm:self-start"
            >
              <Save className="h-4 w-4" />
              Simpan
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-card-bg p-6">
        <div className="flex items-center gap-3 mb-1">
          <Database className="h-5 w-5 text-electric-blue" />
          <h2 className="text-lg font-bold text-soft-white">Seeding Data (Backup / Restore)</h2>
        </div>
        <p className="text-sm text-muted-text mb-5">
          Bawa data MABA yang sudah disetujui dari environment lain (mis. local → production) tanpa distribusi ulang.
          Username & cluster dipertahankan, password direset ke NIM.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3">
            <div className="flex-1">
              <p className="font-semibold text-soft-white">Export CSV</p>
              <p className="text-xs text-muted-text mt-1">
                Unduh seluruh data MABA (nama, username, email, NIM, gender, status, cluster) sebagai file CSV seed.
              </p>
            </div>
            <Button variant="primary" onClick={handleExport} loading={exportMutation.isPending} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3">
            <div className="flex-1">
              <p className="font-semibold text-soft-white">Import CSV</p>
              <p className="text-xs text-muted-text mt-1">
                Import ulang file CSV seed. Username & cluster dipertahankan, tanpa distribusi otomatis.
                Cluster harus sudah ada di database.
              </p>
            </div>
            <Button variant="primary" onClick={() => setImportOpen(true)} className="gap-2">
              <Upload className="h-4 w-4" />
              Import CSV
            </Button>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-lg border border-electric-blue/20 bg-electric-blue/5 p-3">
          <Info className="h-4 w-4 text-electric-blue shrink-0 mt-0.5" />
          <p className="text-xs text-muted-text">
            Fitur ini untuk memindahkan data antar environment. Pastikan cluster dengan nama yang sama sudah ada di
            tujuan sebelum import, dan lakukan di lingkungan yang memang dimaksudkan (jangan di production tanpa backup).
          </p>
        </div>
      </div>

      <SeedImportDialog open={importOpen} onOpenChange={setImportOpen} />
    </div>
  );
}
