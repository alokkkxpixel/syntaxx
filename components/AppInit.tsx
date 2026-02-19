"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTechs, setLoading, setError } from "@/app/redux/features/tech/techSlice";

export default function AppInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTechs = async () => {
      dispatch(setLoading(true));

      try {
        const res = await fetch("/api/tech", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch techs");
        }

        const data = await res.json();
        dispatch(setTechs(data));
      } catch (err: any) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTechs();
  }, [dispatch]);

  return null;
}
