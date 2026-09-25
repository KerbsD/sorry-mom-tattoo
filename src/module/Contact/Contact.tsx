"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { anton, jetbrainsmono } from "@/utils/fonts";
import { DIRECT_CONTACTS, INFO_STRIP } from "@/constants/contact";

import useAnimateContact from "./useAnimateContact";

function Contact() {
  const { containerRef } = useAnimateContact();

  return (
    <section ref={containerRef} className="min-h-screen">
      {/* Hero */}
      <section className="px-6 pt-40 pb-12 text-center">
        <h1 className={`${anton.className} hero-heading text-6xl leading-none`}>
          Let&apos;s Talk
        </h1>

        <p className="hero-copy mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
          Got questions, ideas, or ready to book your next tattoo?
          <br />
          Send us a message — we&apos;re here to help.
        </p>
      </section>

      {/* Contact content */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {/* Messenger CTA */}
            <a
              href="#"
              className="messenger-cta group flex items-center gap-5 border border-teal-400/40 bg-teal-400/5 p-6 transition-colors duration-300 hover:bg-teal-400/10 sm:p-8"
            >
              <Image
                src="/socials/messenger.svg"
                alt="Messenger"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0"
              />

              <div className="min-w-0">
                <p
                  className={`${jetbrainsmono.className} text-xs tracking-[0.2em] text-teal-500`}
                >
                  SEND US A MESSAGE
                </p>
                <p
                  className={`${anton.className} mt-1 flex items-center gap-2 text-2xl sm:text-3xl`}
                >
                  Click to Chat
                  <ArrowRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </p>
                <p className="mt-1 text-sm text-white/55">
                  We&apos;ll reply as soon as possible!
                </p>
              </div>
            </a>

            {/* Other ways to reach us */}
            <div>
              <h2
                className={`${anton.className} contacts-header border-b border-white/10 pb-3 text-2xl`}
              >
                Other Ways to Reach Us
              </h2>

              <div className="contacts-grid mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {DIRECT_CONTACTS.map(
                  ({ id, icon: Icon, image, label, value, href }) => (
                    <div
                      key={id}
                      className="contact-item flex items-start gap-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        {Icon ? (
                          <Icon size={18} strokeWidth={2} color="#2DD4BF" />
                        ) : (
                          <Image
                            src={image}
                            alt={label}
                            width={18}
                            height={18}
                            className="h-4.5 w-4.5"
                          />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`${jetbrainsmono.className} text-[11px] tracking-[0.15em] text-white/50`}
                        >
                          {label}
                        </p>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center tracking-wide transition hover:text-teal-500 md:text-left"
                        >
                          {value}
                        </a>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Right column: map */}
          <div className="map-card flex flex-col gap-px border border-white/10">
            <div className="relative aspect-505/308 w-full overflow-hidden bg-[#dcdcdc]">
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src="/bg-map.png"
                alt="Map showing Sorry Mom Tattoo's location in Antipolo"
                className="absolute inset-0 h-full w-full object-cover"
                fill
                loading="eager"
              />
            </div>

            {/* Info strip */}
            <div className="info-strip grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {INFO_STRIP.map(({ id, icon: Icon, title, lines, href }) => (
                <div key={id} className="info-item flex items-start gap-3 p-5">
                  <Icon size={18} className="mt-0.5 shrink-0 text-white" />
                  <div className="min-w-0">
                    <p className={`${anton.className} text-sm`}>{title}</p>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <p className="mt-1 text-sm leading-relaxed wrap-anywhere text-white/60">
                        {lines.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Contact;
