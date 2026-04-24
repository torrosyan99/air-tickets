import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export const useScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }, [hash, pathname]);

  return null;
}