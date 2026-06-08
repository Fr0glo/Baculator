"use client";

import { useId } from "react";
import { ChevronDownIcon } from "./icons";

export type Option = { value: string; label: string };

/** Styled native <select> — accessible, light, RTL-aware. */
export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  help?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label-field">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field appearance-none pe-10"
          aria-describedby={help ? `${id}-help` : undefined}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute inset-y-0 end-3 my-auto h-4 w-4 text-slate-400" />
      </div>
      {help && (
        <p id={`${id}-help`} className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {help}
        </p>
      )}
    </div>
  );
}
