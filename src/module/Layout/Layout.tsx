import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/utils/ScrollToTop";
interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex shrink-0 grow basis-auto flex-col">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
