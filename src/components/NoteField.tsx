"use client";

import { useId } from "react";

/**
 * A grade input on the [0,20] scale.
 * Stored as a raw string so the user can type freely (incl. an empty field);
 * the parent parses it. Accepts both "." and "," decimals.
 */
export function NoteField({
  label,
  help,
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  label: string;
  help?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label-field">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          // No forced dir: the field follows the page direction, so in Arabic
          // the number aligns right and the "/20" suffix mirrors to the left.
          autoComplete="off"
          autoFocus={autoFocus}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            // Allow only digits, one separator, max 2 decimals.
            const cleaned = e.target.value
              .replace(/[^\d.,]/g, "")
              .replace(/[,.]/, "·") // mark first separator
              .replace(/[,.]/g, "") // drop any further separators
              .replace("·", ",");
            onChange(cleaned);
          }}
          className="input-field pe-12 text-lg font-semibold tabular-nums"
          aria-describedby={help ? `${id}-help` : undefined}
        />
        <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-sm font-medium text-slate-400">
          /20
        </span>
      </div>
      {help && (
        <p id={`${id}-help`} className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {help}
        </p>
      )}
    </div>
  );
}

/** Parse a NoteField string ("15,4") into a clamped number, or null if empty/invalid. */
export function parseNote(raw: string): number | null {
  const s = raw.trim().replace(",", ".");
  if (s === "") return null;
  const n = Number(s);
  if (Number.isNaN(n)) return null;
  return Math.min(20, Math.max(0, n));
}
