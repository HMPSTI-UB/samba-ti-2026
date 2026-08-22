#!/usr/bin/env python3
"""Normalisasi kolom gender pada file CSV agar konsisten dengan data_source2.csv.

Aturan:
    - "Perempuan"   (dari: p / P / perempuan / PEREMPUAN / wanita / cewek / female)
    - "Laki - laki" (dari: l / L / laki-laki / Laki Laki / LAKI LAKI / pria / cowo / male)

Kolom gender dideteksi otomatis dari header yang mengandung "kelamin".
Output: <nama-file>_normalized.csv (di samping file input). Struktur kolom lain dipertahankan.
"""

import csv
import sys
from pathlib import Path


def normalize_gender(raw: str) -> str:
    value = (raw or "").strip().lower()
    if not value:
        return ""
    if value == "p":
        return "Perempuan"
    if value == "l":
        return "Laki - laki"
    if any(flag in value for flag in ("laki", "cowo", "pria", "male")):
        return "Laki - laki"
    if any(flag in value for flag in ("perempuan", "cewek", "wanita", "female")):
        return "Perempuan"
    return raw.strip()


def find_gender_column(fieldnames) -> str | None:
    for name in fieldnames or []:
        if "kelamin" in name.lower():
            return name
    return None


def main() -> None:
    if len(sys.argv) < 2:
        print("Gunakan: python normalize-gender.py <file.csv>", file=sys.stderr)
        sys.exit(1)

    source = Path(sys.argv[1])
    if not source.is_file():
        print(f"File input tidak ditemukan: {source}", file=sys.stderr)
        sys.exit(1)

    output = source.with_name(f"{source.stem}_normalized.csv")

    changed = 0
    rows = []

    with source.open(newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        header = reader.fieldnames or []
        gender_key = find_gender_column(header)

        if not gender_key:
            print(f"[!] Kolom gender tidak ditemukan di {source}", file=sys.stderr)
            sys.exit(1)

        for row in reader:
            new_row = dict(row)
            normalized = normalize_gender(new_row.get(gender_key, ""))
            if normalized != new_row.get(gender_key, ""):
                changed += 1
            new_row[gender_key] = normalized
            rows.append(new_row)

    with output.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=header, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

    print(f"Selesai: {output}")
    print(f"  Kolom gender: {gender_key}")
    print(f"  Baris diproses: {len(rows)}")
    print(f"  Gender dinormalisasi: {changed}")


if __name__ == "__main__":
    main()