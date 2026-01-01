import { useEffect, useState } from "react";
import { getProfile, subscribe } from "./profilemanager.js";

export function useProfile() {
  const [profile, setProfile] = useState(getProfile());

  useEffect(() => {
    return subscribe(setProfile);
  }, []);

  return profile;
}
