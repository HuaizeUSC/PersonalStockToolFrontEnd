"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/search/home");
  }, []);
  return <div></div>;
}
