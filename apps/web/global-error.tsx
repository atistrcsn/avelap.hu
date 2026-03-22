"use client";
import { useEffect } from "react";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    return () => {};
  }, [error]);

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Egy általános hiba történt!</h2>
        <button onClick={() => reset()}>Újrapróbálkozás</button>
      </body>
    </html>
  );
}
