"use client";

import { useId, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { PRODUCTS } from "@/lib/products";
import { mailtoWithBody } from "@/lib/site";
import { composeLeadSubject, composeLeadText } from "@/lib/lead-email";
import {
  LOCATION_BANDS,
  VOLUME_BANDS,
  collectErrors,
  emptyLead,
  isMultiLocation,
  leadSchema,
  type Lead,
  type LeadErrors,
} from "@/lib/lead";
import { Lede, Section, SectionHeading, SectionLabel, cx } from "./ui";

type Status = "idle" | "sending" | "sent" | "error" | "fallback";

/**
 * The page's only destination.
 *
 * Hand-rolled useState + zod rather than react-hook-form — the sibling sites
 * set that precedent and a ten-field form does not justify the dependency.
 *
 * THE FALLBACK IS LOAD-BEARING. If /api/lead answers 502 (Resend not
 * configured, or the send threw) the visitor gets a prefilled mailto carrying
 * their own answers, built from the SAME composer the server would have used.
 * Without it a failed send is a silently lost lead and the visitor walks away
 * believing they got in touch. Do not remove it when a CRM lands.
 */
export function LeadForm() {
  const t = copy.form;
  const baseId = useId();
  const [values, setValues] = useState<Lead>(emptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState<Lead | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof Lead>(key: K, value: Lead[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    /* Clear a field's error the moment it is edited, rather than making the
       visitor resubmit to find out whether they fixed it. */
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function toggleProduct(id: Lead["products"][number]) {
    setValues((v) => ({
      ...v,
      products: v.products.includes(id)
        ? v.products.filter((p) => p !== id)
        : [...v.products, id],
    }));
    setErrors((e) => (e.products ? { ...e, products: undefined } : e));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = leadSchema.safeParse(values);

    if (!parsed.success) {
      setErrors(collectErrors(parsed.error));
      setStatus("idle");
      summaryRef.current?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (res.status === 502) {
        /* We accepted it but could not send. Hand over the mailto rather than
           showing a success screen for an email that does not exist. */
        setSent(parsed.data);
        setStatus("fallback");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));

      setSent(parsed.data);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(emptyLead);
    setSent(null);
    setStatus("idle");
  }

  /* ---------------------------------------------------------------- sent -- */
  if (status === "sent" && sent) {
    return (
      <Section id="samples" tone="raised" className="border-t border-line">
        <div className="mx-auto max-w-xl rounded-2xl border border-line bg-bg p-8 text-center sm:p-12">
          <div
            aria-hidden="true"
            className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-fill/15"
          >
            <svg viewBox="0 0 20 20" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m4 10.5 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 role="status" className="mt-6 font-display text-2xl font-semibold text-heading">
            {t.successTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-muted">
            {t.successBody}
          </p>

          <button type="button" onClick={reset} className={resetCx}>
            {t.successReset}
          </button>
        </div>
      </Section>
    );
  }

  /* ------------------------------------------------------------ fallback -- */
  if (status === "fallback" && sent) {
    return (
      <Section id="samples" tone="raised" className="border-t border-line">
        <div className="mx-auto max-w-xl rounded-2xl border border-warm/50 bg-bg p-8 text-center sm:p-12">
          <h2 role="status" className="font-display text-2xl font-semibold text-heading">
            {t.fallbackTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">
            {t.fallbackBody}
          </p>

          <a
            href={mailtoWithBody(composeLeadSubject(sent), composeLeadText(sent))}
            className="mt-7 inline-flex items-center justify-center rounded-full bg-accent-fill px-7 py-3.5 text-sm font-semibold text-on-accent transition-[filter] hover:brightness-110"
          >
            {t.fallbackCta}
          </a>

          <button type="button" onClick={reset} className={resetCx}>
            {t.successReset}
          </button>
        </div>
      </Section>
    );
  }

  /* ---------------------------------------------------------------- form -- */
  const err = (k: keyof Lead) => {
    const key = errors[k];
    if (!key) return undefined;
    return (t.errors as Record<string, string>)[key] ?? key;
  };
  const hasErrors = Object.keys(errors).some((k) => errors[k as keyof Lead]);
  const multi = isMultiLocation(values);

  return (
    <Section id="samples" tone="raised" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <SectionLabel>{t.label}</SectionLabel>
          <SectionHeading>{t.heading}</SectionHeading>
          <Lede>{t.body}</Lede>
        </div>

        <form onSubmit={onSubmit} noValidate className="grid gap-6">
          {/* Focus lands here on a failed submit so a screen reader announces
              the summary. w-fit keeps the focus ring around the text rather
              than stretching it across the whole form. */}
          <div
            ref={summaryRef}
            tabIndex={-1}
            role={hasErrors ? "alert" : undefined}
            className={cx("w-fit text-sm font-medium text-warm", hasErrors ? "block" : "sr-only")}
          >
            {hasErrors ? t.errors.summary : null}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id={`${baseId}-name`}
              label={t.fields.name}
              required
              autoComplete="name"
              value={values.name}
              onChange={(v) => set("name", v)}
              error={err("name")}
            />
            <Field
              id={`${baseId}-cafe`}
              label={t.fields.cafe}
              required
              autoComplete="organization"
              value={values.cafe}
              onChange={(v) => set("cafe", v)}
              error={err("cafe")}
            />
            <Field
              id={`${baseId}-email`}
              label={t.fields.email}
              required
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(v) => set("email", v)}
              error={err("email")}
            />
            <Field
              id={`${baseId}-phone`}
              label={t.fields.phone}
              optionalLabel={t.optional}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone ?? ""}
              onChange={(v) => set("phone", v)}
              error={err("phone")}
            />
          </div>

          <Field
            id={`${baseId}-city`}
            label={t.fields.city}
            required
            autoComplete="address-level2"
            placeholder={t.placeholders.city}
            help={t.help.city}
            value={values.city}
            onChange={(v) => set("city", v)}
            error={err("city")}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Select
              id={`${baseId}-locations`}
              label={t.fields.locations}
              value={values.locations}
              onChange={(v) => set("locations", v as Lead["locations"])}
              options={LOCATION_BANDS.map((b) => ({ value: b, label: t.locations[b] }))}
            />
            <Select
              id={`${baseId}-volume`}
              label={t.fields.volume}
              value={values.volume}
              onChange={(v) => set("volume", v as Lead["volume"])}
              options={VOLUME_BANDS.map((b) => ({ value: b, label: t.volume[b] }))}
            />
          </div>

          {/* A checkbox group is a group: fieldset/legend, so the question is
              announced once and each box is read as part of it. */}
          <fieldset className="grid gap-3">
            <legend className={labelCx}>
              {t.fields.products} <span aria-hidden="true" className="text-accent">*</span>
            </legend>
            <p className="text-xs text-muted">{t.help.products}</p>

            <div className="mt-1 grid gap-2.5">
              {PRODUCTS.map((p) => {
                const checked = values.products.includes(p.id);
                return (
                  <label
                    key={p.id}
                    className={cx(
                      "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 transition-colors",
                      checked ? "border-accent bg-accent-fill/10" : "border-line hover:border-muted",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleProduct(p.id)}
                      aria-describedby={err("products") ? `${baseId}-products-error` : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent-fill)]"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-heading">
                        {copy.line.items[p.id].name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {copy.line.items[p.id].role}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            {err("products") ? (
              <p id={`${baseId}-products-error`} className="text-xs text-warm">
                {err("products")}
              </p>
            ) : null}
          </fieldset>

          <div className="grid gap-2">
            <label htmlFor={`${baseId}-message`} className={labelCx}>
              {t.fields.message}{" "}
              <span className="font-normal normal-case tracking-normal text-muted">
                ({t.optional})
              </span>
            </label>
            <textarea
              id={`${baseId}-message`}
              rows={4}
              placeholder={t.placeholders.message}
              value={values.message ?? ""}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={err("message") ? true : undefined}
              className={cx(inputCx, "resize-y")}
            />
            {err("message") ? <p className="text-xs text-warm">{err("message")}</p> : null}
          </div>

          {/* Honeypot. Hidden from sight, from assistive tech, and from the tab
              order. A human never sees it; a naive bot fills it and gets
              silently dropped by the API route. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor={`${baseId}-website`}>Website</label>
            <input
              id={`${baseId}-website`}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website ?? ""}
              onChange={(e) => set("website", e.target.value)}
            />
          </div>

          {status === "error" ? (
            <p role="alert" className="text-sm text-warm">
              {t.errors.network}
            </p>
          ) : null}

          <div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-accent-fill px-7 py-3.5 text-sm font-semibold text-on-accent transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? t.submitting : multi ? t.submitMulti : t.submit}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

const labelCx = "text-xs font-semibold uppercase tracking-[0.14em] text-muted";

const inputCx =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-heading placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none";

const resetCx =
  "mt-5 block w-full text-xs text-muted underline underline-offset-4 transition-colors hover:text-heading";

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  optionalLabel,
  help,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  optionalLabel?: string;
  help?: string;
  type?: string;
  placeholder?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
}) {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className={labelCx}>
        {label}{" "}
        {required ? (
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        ) : optionalLabel ? (
          <span className="font-normal normal-case tracking-normal text-muted">
            ({optionalLabel})
          </span>
        ) : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(inputCx, error && "border-warm")}
        {...rest}
      />
      {help ? (
        <p id={helpId} className="text-xs text-muted">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-warm">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className={labelCx}>
        {label} <span aria-hidden="true" className="text-accent">*</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          inputCx,
          "appearance-none bg-[length:0.7rem] bg-[right_1rem_center] bg-no-repeat pr-10",
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6' fill='none' stroke='%23888' stroke-width='1.5'%3E%3Cpath d='m1 1 4 4 4-4'/%3E%3C/svg%3E\")",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
