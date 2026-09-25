"use client";

import { anton } from "@/utils/fonts";
import { usePathname } from "next/navigation";
import FOOTER_COLUMNS from "./FooterColums";

function Footer() {
  const currentYear = new Date().getFullYear();

  const pathname = usePathname();

  const isContactPage = pathname === "/contact";

  return (
    <>
      {isContactPage ? (
        <></>
      ) : (
        <footer className="flex min-h-50 w-full flex-col-reverse items-center bg-[#ebebeb] text-[#161616] md:flex-row">
          <div className="flex items-center justify-center lg:w-[35dvw]">
            <span
              className={`-translate-x-1 p-10 text-center text-[clamp(48px,58px,68px)] leading-[0.90] tracking-[-1px] ${anton.className}`}
              style={
                {
                  textBoxTrim: "trim-both",
                  textBoxEdge: "cap alphabetic",
                } as React.CSSProperties
              }
            >
              SORRY MOM TATTOO
            </span>
          </div>

          <div className="my-10 flex flex-col-reverse items-center md:mx-auto md:my-0">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-10 xl:grid-cols-3">
              {FOOTER_COLUMNS.map(
                ({ title, headingClassName, content, icon }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center px-5 py-5 text-sm md:items-start md:text-base xl:mx-auto"
                  >
                    <h6 className={headingClassName}>
                      {title} {icon}
                    </h6>
                    {content}
                  </div>
                ),
              )}
            </div>
          </div>
        </footer>
      )}

      <div className="flex w-full flex-col-reverse items-center justify-center px-6 py-3 text-xs uppercase md:flex-row md:items-start md:justify-between">
        <span className="tracking-tighter">
          Built with passion by <b>KerbsDev</b>
        </span>
        <span className="tracking-tighter">
          <b>© {currentYear} Sorry Mom Tattoo</b>. All rights reserved.
        </span>
      </div>
    </>
  );
}

export default Footer;
