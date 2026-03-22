"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Valami hiba történhetett a weboldal futtatása közben:</h2>
      <pre>{error?.message}</pre>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset?.()
        }
      >
        Újrapróbálkozás
      </button>
    </div>
  );
}
