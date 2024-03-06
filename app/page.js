import Image from "next/image";
import Page from "./welcome/page";
export default function Home() {
  return (
    <main className="flex max-h-screen flex-col items-center justify-between">
      <Page />
    </main>
  );
}
