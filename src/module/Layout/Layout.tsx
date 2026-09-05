import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="flex flex-col grow shrink-0 basis-auto">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
