import React from 'react';

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Off-screen decoy field. Real visitors never see it, so anything that fills it
 * in is a bot and the server drops the submission. Catches naive scripted spam
 * only — real rate limiting still belongs on the server.
 *
 * The field is deliberately NOT named after anything a browser or password
 * manager recognises (company, website, url, address...). Autofill happily
 * populates hidden fields, and a false positive here silently swallows a real
 * enquiry.
 */
export default function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
      <label htmlFor="hp_token">Leave this field empty</label>
      <input
        id="hp_token"
        name="hp_token"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        data-lpignore="true"
        data-1p-ignore
        data-form-type="other"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
