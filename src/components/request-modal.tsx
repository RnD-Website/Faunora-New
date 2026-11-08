"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { requestForm } from "@/content/site";
import { Check, Close } from "./icons";

type Ctx = { open: (product?: string) => void };
const RequestCtx = createContext<Ctx>({ open: () => {} });

export function useRequest() {
  return useContext(RequestCtx);
}

export function RequestButton({
  children,
  className = "btn btn-primary",
  product,
}: {
  children: ReactNode;
  className?: string;
  product?: string;
}) {
  const { open } = useRequest();
  return (
    <button type="button" className={className} onClick={() => open(product)}>
      {children}
    </button>
  );
}

type Status = "idle" | "sending" | "done" | "error";

export function RequestProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [product, setProduct] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const open = useCallback((p?: string) => {
    setProduct(p);
    setStatus("idle");
    setError("");
    dialog.current?.showModal();
  }, []);

  const close = () => dialog.current?.close();

  // Allow plain links to "#request" to open the form too.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#request") {
        open();
        history.replaceState(null, "", window.location.pathname);
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      business: fd.get("business"),
      businessType: fd.get("businessType"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      country: fd.get("country"),
      animals: fd.getAll("animals"),
      headcount: fd.get("headcount"),
      timing: fd.get("timing"),
      message: fd.get("message"),
      product: product ?? "",
      website: fd.get("website"), // honeypot
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const field =
    "w-full rounded-2xl border border-line bg-white px-4 py-3 text-[15px] text-navy placeholder:text-muted/70 focus:border-navy focus:outline-none";
  const label = "mb-1.5 block text-sm font-semibold tracking-tight";

  return (
    <RequestCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="request-title"
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto w-[min(680px,calc(100%-24px))] max-h-[calc(100dvh-24px)] overflow-y-auto rounded-[28px] bg-paper p-0 text-navy shadow-2xl backdrop:bg-navy/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-6 md:p-9">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white hover:bg-peach"
          >
            <Close />
          </button>

          {status === "done" ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-orange text-navy">
                <Check className="size-8" />
              </div>
              <h2 id="request-title" className="h-lg">Thank you!</h2>
              <p className="lede mx-auto mt-3 max-w-sm text-muted">
                Your request is in. Our nutrition team will contact you within two working days.
              </p>
              <button type="button" onClick={close} className="btn btn-dark mt-8">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="pr-10">
                <p className="eyebrow text-navy-500">Request a sample</p>
                <h2 id="request-title" className="h-lg mt-2">
                  {product ? `Request ${product}` : "Request Faunora for your animals"}
                </h2>
                <p className="mt-2 text-muted">Tell us a little about you and we will tailor a trial pack.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={label} htmlFor="rq-name">Full name *</label>
                  <input id="rq-name" name="name" required autoComplete="name" className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="rq-business">Farm / clinic / store name</label>
                  <input id="rq-business" name="business" autoComplete="organization" className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="rq-email">Email *</label>
                  <input id="rq-email" name="email" type="email" required autoComplete="email" className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="rq-phone">Phone</label>
                  <input id="rq-phone" name="phone" type="tel" autoComplete="tel" className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="rq-type">I am a… *</label>
                  <select id="rq-type" name="businessType" required defaultValue="" className={field}>
                    <option value="" disabled>Select one</option>
                    {requestForm.businessTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="rq-country">Country *</label>
                  <select id="rq-country" name="country" required defaultValue="" className={field}>
                    <option value="" disabled>Select country</option>
                    {requestForm.countries.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className={label}>Which animals? *</legend>
                <div className="flex flex-wrap gap-2">
                  {requestForm.animals.map((a) => (
                    <label key={a} className="cursor-pointer">
                      <input type="checkbox" name="animals" value={a} className="peer sr-only" />
                      <span className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium transition peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-teal">
                        {a}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={label} htmlFor="rq-headcount">Number of animals</label>
                  <input id="rq-headcount" name="headcount" inputMode="numeric" placeholder="e.g. 2 dogs, 150 cows" className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="rq-timing">When do you need it?</label>
                  <select id="rq-timing" name="timing" defaultValue="" className={field}>
                    <option value="">Select timing</option>
                    {requestForm.timing.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={label} htmlFor="rq-message">Current feeding / supplement program</label>
                <textarea id="rq-message" name="message" rows={3} className={field} placeholder="What are you using today?" />
              </div>

              {/* honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {status === "error" && (
                <p role="alert" className="rounded-2xl bg-orange/15 px-4 py-3 text-sm font-medium">
                  Oops! {error}
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
              <p className="text-center text-xs text-muted">We only use your details to respond to this request.</p>
            </form>
          )}
        </div>
      </dialog>
    </RequestCtx.Provider>
  );
}
