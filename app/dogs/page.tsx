import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <h1>Hello, General Dog Page!</h1>
    </Suspense>
  );
}
