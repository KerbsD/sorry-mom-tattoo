"use client";

import useCartDrawer from "./useCartDrawer";
import { CHANNELS, type Channel } from "@/lib/checkout";
import { formatPHP } from "@/constants/Merch/Products";

/*
 * Tailwind can't see class names built with template strings
 * (e.g. `channel-${c}`), so per-channel colors live in a lookup map.
 * Replace the keys with your real Channel values.
 */
const CHANNEL_STYLES: Partial<Record<Channel, string>> = {
  // whatsapp: "bg-[#25D366] text-black hover:bg-[#1ebe5b]",
  // messenger: "bg-[#0084ff] text-white hover:bg-[#0073e6]",
  // telegram: "bg-[#27a7e7] text-white hover:bg-[#1d96d3]",
};
const DEFAULT_CHANNEL_STYLE = "bg-teal-300 text-black hover:bg-teal-200";

export function CartDrawer() {
  const {
    lines,
    total,
    isOpen,
    closeCart,
    setQty,
    remove,
    clear,
    note,
    setNote,
    notice,
    channels,
    handleCheckout,
  } = useCartDrawer();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60"
      onClick={closeCart}
    >
      <aside
        className="flex h-full w-full max-w-md flex-col gap-5 overflow-y-auto bg-[#1c1c1c] p-5 text-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-semibold">Your cart</h2>
          <button
            className="rounded-lg px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none"
            onClick={closeCart}
          >
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <p className="py-10 text-center text-sm text-white/60">
            Your cart is empty. Add a product to start an order.
          </p>
        ) : (
          <>
            <ul className="flex flex-col divide-y divide-white/10">
              {lines.map((l) => (
                <li
                  key={l.key}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-3"
                >
                  <div>
                    <strong className="font-medium">{l.name}</strong>
                    <div className="text-sm text-white/60">
                      {formatPHP(l.price)} each
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-white/15 p-0.5">
                    <button
                      className="flex size-7 items-center justify-center rounded-full text-lg leading-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none"
                      aria-label={`Remove one ${l.name}`}
                      onClick={() => setQty(l.key, l.qty - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-sm tabular-nums">
                      {l.qty}
                    </span>
                    <button
                      className="flex size-7 items-center justify-center rounded-full text-lg leading-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none"
                      aria-label={`Add one ${l.name}`}
                      onClick={() => setQty(l.key, l.qty + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="col-span-2 justify-self-start text-xs text-white/50 underline underline-offset-2 transition-colors hover:text-red-400"
                    onClick={() => remove(l.key)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <label className="flex flex-col gap-2 text-sm text-white/70">
              Note for the seller (optional)
              <textarea
                className="resize-none rounded-lg border border-white/15 bg-white/5 p-3 text-white placeholder:text-white/30 focus:border-teal-300 focus:outline-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Name, delivery address, preferred payment"
                rows={3}
              />
            </label>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-lg">
              <span>Total</span>
              <strong className="font-semibold text-teal-300">
                {formatPHP(total)}
              </strong>
            </div>

            {channels.length === 0 ? (
              <p className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-200">
                No chat app is set up. Add a number, username, or page name in{" "}
                <code className="rounded bg-black/40 px-1 py-0.5 text-xs">
                  .env.local
                </code>
                .
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-white/60">
                  Send your order through:
                </p>
                <div className="flex flex-wrap gap-2">
                  {channels.map((c) => (
                    <button
                      key={c}
                      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                        CHANNEL_STYLES[c] ?? DEFAULT_CHANNEL_STYLE
                      }`}
                      onClick={() => handleCheckout(c)}
                    >
                      {CHANNELS[c].label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {notice && (
              <p
                className="rounded-lg bg-teal-300/10 p-3 text-sm text-teal-200"
                role="status"
              >
                {notice}
              </p>
            )}

            <button
              className="self-start text-xs text-white/50 underline underline-offset-2 transition-colors hover:text-red-400"
              onClick={clear}
            >
              Clear cart
            </button>
          </>
        )}
      </aside>
    </div>
  );
}
