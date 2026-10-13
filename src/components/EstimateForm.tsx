"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { estimateServiceOptions } from "@/lib/services";

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "service" | "location" | "description" | "photos", string>>;

type Status = { type: "success" | "error"; message: string } | null;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EstimateForm() {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const next: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const photos = data.getAll("photos").filter((item): item is File => item instanceof File && item.size > 0);

    if (name.length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number we can use to reach you.";
    if (!estimateServiceOptions.includes(service)) next.service = "Choose a service.";
    if (location.length < 2) next.location = "Enter the project location.";
    if (description.length < 20) next.description = "Describe the project in at least a few sentences.";
    if (photos.length > 4) next.photos = "Attach up to 4 photos.";
    if (photos.some((file) => file.size > 4 * 1024 * 1024)) next.photos = "Each photo must be 4 MB or smaller.";
    if (photos.some((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type))) {
      next.photos = "Photos must be JPG, PNG, or WebP.";
    }
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const next = validate(form);
    setErrors(next);
    setStatus(null);
    if (Object.keys(next).length > 0) {
      setStatus({ type: "error", message: "Check the highlighted fields and try again." });
      return;
    }

    const body = new FormData(form);
    body.set("startedAt", String(startedAt.current));
    setPending(true);
    try {
      const response = await fetch("/api/estimate", { method: "POST", body });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      };
      if (payload.fieldErrors) setErrors(payload.fieldErrors);
      if (payload.ok) {
        setStatus({ type: "success", message: payload.message || "Your request was sent." });
        form.reset();
        startedAt.current = Date.now();
      } else {
        setStatus({
          type: "error",
          message: payload.message || "The request was not sent.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "The request could not be sent. Check your connection and try again. If you attached photos, try smaller files.",
      });
    } finally {
      setPending(false);
    }
  }

  const id = (name: string) => `${baseId}-${name}`;

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-labelledby="estimate-heading">
      <div className="hp" aria-hidden="true">
        <label htmlFor={id("company")}>Company website</label>
        <input id={id("company")} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <Field id={id("name")} name="name" label="Name" autoComplete="name" error={errors.name} required />
        <Field id={id("email")} name="email" label="Email" type="email" autoComplete="email" error={errors.email} required />
        <Field id={id("phone")} name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} required />
        <div className="field">
          <label className="label" htmlFor={id("service")}>
            Service needed <RequiredMark />
          </label>
          <select id={id("service")} name="service" required aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? id("service-error") : undefined} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {estimateServiceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.service ? <p className="field-error" id={id("service-error")}>{errors.service}</p> : null}
        </div>
        <Field id={id("location")} name="location" label="Project location" autoComplete="address-level2" error={errors.location} required span />
        <div className="field field-span">
          <label className="label" htmlFor={id("description")}>
            Project description <RequiredMark />
          </label>
          <textarea id={id("description")} name="description" required aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? id("description-error") : undefined} />
          {errors.description ? <p className="field-error" id={id("description-error")}>{errors.description}</p> : null}
        </div>
        <div className="field field-span">
          <label className="label" htmlFor={id("photos")}>Photos <span className="muted">(optional)</span></label>
          <input id={id("photos")} name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple aria-describedby={id("photos-hint")} />
          <p className="hint" id={id("photos-hint")}>
            Up to 4 JPG, PNG, or WebP files, 4 MB each. Photos are attached to the email only after delivery is configured. They are not stored on this website.
          </p>
          {errors.photos ? <p className="field-error">{errors.photos}</p> : null}
        </div>
      </div>
      {status ? (
        <p className={`form-status ${status.type}`} role={status.type === "error" ? "alert" : "status"}>
          {status.message}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Request a Free Estimate"}
      </button>
    </form>
  );
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true">*</span>
      <span className="visually-hidden">required</span>
    </>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
  required,
  span,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
  span?: boolean;
}) {
  return (
    <div className={span ? "field field-span" : "field"}>
      <label className="label" htmlFor={id}>
        {label} {required ? <RequiredMark /> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? <p className="field-error" id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}
