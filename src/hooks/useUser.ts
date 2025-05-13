"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [tokenLimitReached, setTokenLimitReached] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setExpired(false);
        setTokenLimitReached(false);
        setLoading(false);
        return;
      }

      const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
      const data = docSnap.data();

      const fullUser = { ...firebaseUser, ...data };
      setUser(fullUser);

      // Trial expiry check
      if (data?.trialEndsAt && Date.now() > data.trialEndsAt) {
        setExpired(true);
      } else {
        setExpired(false);
      }

      // Token usage check
      if (data?.tokensUsed >= data?.maxTokens) {
        setTokenLimitReached(true);
      } else {
        setTokenLimitReached(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, expired, tokenLimitReached };
}
