#!/usr/bin/env python3
"""Normalisasi students_new.csv agar sesuai format students.csv.

Output: students_YYYYMMDD_HHMM.csv (di samping file input).
Kolom target (sesuai students.csv):
    Timestamp, Nama lengkap, NIM, Email pribadi, Jenis Kelamin, Column 1
"""

import csv
import re
import sys
from datetime import datetime
from pathlib import Path

SOURCE_FILENAME = "students_new.csv"

TARGET_HEADER = ["Timestamp", "Nama lengkap", "NIM", "Email pribadi", "Jenis Kelamin", "Column 1"]

COLUMN_MAP = {
    "Timestamp": "Timestamp",
    "Nama lengkap": "Nama Lengkap",
    "NIM": "NIM",
    "Email pribadi": "Email pribadi",
    "Jenis Kelamin": "Jenis kelamin",
}

NIM_RE = re.compile(r"^\d{15}$")
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def normalize_gender(raw: str) -> str:
    value = (raw or "").strip().lower()
    if not value:
        return ""
    if any(flag in value for flag in ("laki", "cowo", "pria", "male")) or value == "l":
        return "Laki - laki"
    if any(flag in value for flag in ("perempuan", "cewek", "wanita", "female")) or value == "p":
        return "Perempuan"
    return raw.strip()


def clean(value: str) -> str:
    return (value or "").strip()


def normalize(source: Path, output: Path) -> None:
    with source.open(newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = []
        skipped_empty = 0
        skipped_invalid = 0

        for row in reader:
            timestamp = clean(row.get("Timestamp", ""))
            name = clean(row.get("Nama Lengkap", ""))
            nim = clean(row.get("NIM", ""))
            email = clean(row.get("Email pribadi", ""))
            gender = normalize_gender(row.get("Jenis kelamin", ""))

            if not (name or nim or email):
                skipped_empty += 1
                continue

            if not NIM_RE.match(nim):
                print(f"  [skip] NIM tidak valid ({nim!r}) -> {name!r}")
                skipped_invalid += 1
                continue

            if not EMAIL_RE.match(email):
                print(f"  [skip] Email tidak valid ({email!r}) -> {name!r}")
                skipped_invalid += 1
                continue

            rows.append([timestamp, name, nim, email, gender, ""])

    with output.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerow(TARGET_HEADER)
        writer.writerows(rows)

    print(f"\nSelesai: {output}")
    print(f"  Baris diproses: {len(rows)}")
    print(f"  Dibuang (kosong): {skipped_empty}")
    print(f"  Dibuang (tidak valid): {skipped_invalid}")


def main() -> None:
    source_arg = sys.argv[1] if len(sys.argv) > 1 else str(Path(__file__).parent / SOURCE_FILENAME)
    source = Path(source_arg)

    if not source.is_file():
        print(f"File input tidak ditemukan: {source}", file=sys.stderr)
        sys.exit(1)

    stamp = datetime.now().strftime("%Y%m%d_%H%M")
    output = source.with_name(f"students_{stamp}.csv")
    normalize(source, output)


if __name__ == "__main__":
    main()
