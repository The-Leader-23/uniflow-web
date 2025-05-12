"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setExpired(false);
        setLoading(false);
        return;
      }

      const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
      const data = docSnap.data();

      setUser({ ...firebaseUser, ...data });

      if (data?.trialEndsAt && Date.now() > data.trialEndsAt) {
        setExpired(true);
      } else {
        setExpired(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, expired };
}
