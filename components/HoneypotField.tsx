import React from 'react';

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Off-screen decoy field. Real visitors never see it, so anything that fills it
 * in is a bot and the submission can be dropped. Catches naive scripted spam
 * only — real rate limiting still belongs on the server.
 */
export default function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
      <label htmlFor="company_website">Company website (leave this empty)</label>
      <input
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
