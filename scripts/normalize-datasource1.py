#!/usr/bin/env python3
"""Normalisasi gender di data_source1.csv agar konsisten dengan data_source2.csv.

Target format gender (sesuai data_source2.csv):
    - "Perempuan"   (sebelumnya: p / P / perempuan / PEREMPUAN)
    - "Laki - laki" (sebelumnya: l / L / Laki-laki / Laki-Laki / Laki laki / cowo / pria / dll)

Output: data_source1_normalized.csv (di samping file input).
"""

import csv
import sys
from pathlib import Path

SOURCE_FILENAME = "data_source1.csv"


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
    return value


def main() -> None:
    source_arg = sys.argv[1] if len(sys.argv) > 1 else str(Path(__file__).parent / SOURCE_FILENAME)
    source = Path(source_arg)

    if not source.is_file():
        print(f"File input tidak ditemukan: {source}", file=sys.stderr)
        sys.exit(1)

    output = source.with_name(f"{source.stem}_normalized.csv")

    changed = 0
    rows = []

    with source.open(newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        header = reader.fieldnames or []
        for row in reader:
            new_row = dict(row)
            gender_key = "Jenis kelamin"
            if gender_key in new_row:
                normalized = normalize_gender(new_row[gender_key])
                if normalized != new_row[gender_key]:
                    changed += 1
                new_row[gender_key] = normalized
            rows.append(new_row)

    with output.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=header, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

    print(f"Selesai: {output}")
    print(f"  Baris diproses: {len(rows)}")
    print(f"  Gender dinormalisasi: {changed}")


if __name__ == "__main__":
    main()