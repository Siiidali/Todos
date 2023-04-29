import { useState, useEffect } from "react";

export function useUser(key: string): string | null {
  const [user, setUser] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      console.log(storedValue);
      if (storedValue !== undefined && storedValue !== null) {
        return JSON.parse(storedValue);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== undefined && storedValue !== null) {
        setUser(JSON.parse(storedValue));
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  }, [key]);

  return user;
}
