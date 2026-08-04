"use client";

import { useState } from "react";
import SweetAlert from "./sweet-alert";
import { consumeJustLoggedIn } from "@/lib/just-logged-in";

export default function PostLoginAlert() {
  const [show, setShow] = useState(() => consumeJustLoggedIn());

  return (
    <SweetAlert
      open={show}
      onClose={() => setShow(false)}
      type="success"
      title="Login Berhasil"
      message="Selamat datang kembali di SAMBA TI 2026!"
    />
  );
}
