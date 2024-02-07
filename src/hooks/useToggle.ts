import { useState } from "react";

export const useToggle = () => {
  const [status, setStatus] = useState(false);

  const show = () => setStatus(true);

  const close = () => setStatus(false);

  return { open: status, show, close };
};
