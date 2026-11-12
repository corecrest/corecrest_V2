import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Info,
  Database,
  PenLine,
  MessageSquare,
  Phone,
  Fingerprint,
  Globe,
  Archive,
  Trash2,
  UserCheck,
  Baby,
  RefreshCw,
  Mail,
} from 'lucide-react';
import SEO from '../components/SEO';

const EFFECTIVE_DATE = '12 November 2026';
const COMPANY_NAME = 'CoreCrest';
const COMPANY_ADDRESS = 'Kigali, Rwanda';
const CONTACT_EMAIL = 'info@corecrest.tech';

// This wording has to match what the app does and what the Play Data safety
// form says. Only change it when the app changes.

interface SectionProps {
  icon: React.ElementType;
  title: string;
  delay: number;
  children: React.ReactNode;
}

function Section({ icon: Icon, title, delay, children }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-3xl shadow-lg border border-slate-200/50 p-8 md:p-10"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 pt-2">{title}</h2>
      </div>
      <div className="space-y-4 text-slate-700 leading-relaxed">{children}</div>
    </motion.section>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2 pl-6 list-disc marker:text-teal-600">{children}</ul>;
}

function EmailLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-600 hover:underline font-medium">
      {CONTACT_EMAIL}
    </a>
  );
}

export default function RangaPrivacyPolicy() {
  return (
    <>
      <SEO
        title="Ranga Privacy Policy | CoreCrest"
        description="Ranga keeps your financial data on your phone, encrypted. No accounts, no ads, no tracking. The full privacy policy for the Ranga Android app."
        keywords="Ranga privacy policy, Ranga app, money tracker Rwanda, mobile money tracker, personal finance app Rwanda, CoreCrest"
        ogTitle="Ranga Privacy Policy | CoreCrest"
        ogDescription="Your data stays on your phone. No accounts, no ads, no tracking, and Ranga never sees your mobile money PIN."
        ogUrl="https://corecrest.tech/ranga/privacy-policy"
        canonicalUrl="https://corecrest.tech/ranga/privacy-policy"
      />
      <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide bg-[#235F45]/10 text-[#235F45]">
                Ranga by CoreCrest
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Ranga Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Effective date: {EFFECTIVE_DATE}
            </p>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-3xl shadow-lg border border-teal-100 p-8 md:p-10 mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The short version</h2>
            <ul className="space-y-3 pl-6 list-disc marker:text-teal-600 text-slate-800 leading-relaxed">
              <li>
                <strong>Your data stays on your phone.</strong> It is stored encrypted. We have no
                servers that receive it.
              </li>
              <li>
                <strong>No accounts.</strong> There is no sign-up and no Ranga login.
              </li>
              <li>
                <strong>No ads, analytics or tracking.</strong> We do not sell, rent or share your
                personal data.
              </li>
              <li>
                <strong>Notification access is optional.</strong> If you turn it on, Ranga reads
                payment messages only from the senders you choose.
              </li>
              <li>
                <strong>Ranga never sees your mobile money PIN.</strong> You enter it in your
                provider's own menu.
              </li>
            </ul>
          </motion.div>

          <div className="space-y-6">
            <Section icon={Info} title="Who we are and what Ranga is" delay={0.15}>
              <p>
                Ranga (Android package <code className="text-sm">tech.corecrest.ranga</code>) is
                made by {COMPANY_NAME}, {COMPANY_ADDRESS}. We are the data controller for this app.
                In this policy, "we" and "us" mean {COMPANY_NAME}.
              </p>
              <p>
                Ranga is a money tracker for people in Rwanda. It shows your mobile money, bank, cash
                and card balances in one place. It records your transactions. It also helps you start
                mobile money payments through your provider's own USSD menu.
              </p>
              <p>
                Ranga is not a bank, wallet or payment service. It never holds or moves money. It is
                not affiliated with MTN, Bank of Kigali or any other provider it works with.
              </p>
            </Section>

            <Section icon={Database} title="How your data is stored" delay={0.2}>
              <List>
                <li>There are no Ranga accounts and no sign-up.</li>
                <li>We have no servers that receive your financial data.</li>
                <li>
                  Everything you enter, and everything Ranga records, stays on your phone in an
                  encrypted database.
                </li>
                <li>
                  The encryption key is kept in your phone's secure storage (Android Keystore).
                </li>
                <li>
                  Android's automatic cloud backup is turned off for Ranga. Your Ranga data is not
                  copied to Google Drive.
                </li>
                <li>
                  Ranga has no advertising, no analytics, no tracking and no crash-reporting tools.
                </li>
                <li>We do not sell, rent or share your personal data.</li>
              </List>
            </Section>

            <Section icon={PenLine} title="Data you enter" delay={0.25}>
              <p>This data is kept only on your phone:</p>
              <List>
                <li>Your name and phone number, if you add them in Profile. Both are optional.</li>
                <li>Your accounts and balances, transactions, categories and notes.</li>
                <li>Saved recipients: names, phone numbers and merchant codes.</li>
              </List>
            </Section>

            <Section icon={MessageSquare} title="Notification access (optional)" delay={0.3}>
              <p>
                Notification access is off unless you turn it on in Android settings. Ranga works
                without it.
              </p>
              <p>
                <strong className="text-slate-900">What it is used for.</strong> Ranga uses it only
                to read payment messages from the senders you choose in Ranga. This lets Ranga record
                transactions and confirm payments automatically. The senders you can choose are:
              </p>
              <List>
                <li>MTN MoMo: "M-Money" and "MoMo"</li>
                <li>Bank of Kigali: "BKeBANK" and "BK BANK"</li>
              </List>
              <p>
                <strong className="text-slate-900">What it reads.</strong> Ranga only processes
                notifications that come from your phone's default SMS app, and only from the senders
                you chose. All other notifications are ignored and never stored.
              </p>
              <p>
                <strong className="text-slate-900">What it keeps.</strong> Messages that are read are
                turned into transaction records on your phone. MoMo service notices are kept on your
                phone, encrypted.
              </p>
              <p>
                <strong className="text-slate-900">Nothing leaves your phone.</strong> No content
                from notifications is sent anywhere.
              </p>
              <p>
                <strong className="text-slate-900">You stay in control.</strong> You can turn
                senders off in Ranga, or remove notification access in Android settings, at any time.
              </p>
            </Section>

            <Section icon={Phone} title="Phone permission (making calls)" delay={0.35}>
              <List>
                <li>
                  Ranga uses this permission only to dial your provider's USSD code when you start a
                  payment. This takes you straight to your provider's PIN prompt.
                </li>
                <li>
                  Ranga never sees, receives or stores your mobile money PIN. Your provider's own
                  menu asks for it.
                </li>
                <li>Ranga does not make any other calls.</li>
                <li>Ranga does not read your call logs.</li>
              </List>
            </Section>

            <Section icon={Fingerprint} title="Fingerprint and screen lock (optional)" delay={0.4}>
              <List>
                <li>
                  If you turn on the app lock, Android checks your fingerprint or screen lock.
                </li>
                <li>
                  Ranga only learns whether the check passed. It never receives your fingerprint
                  data.
                </li>
                <li>
                  While the lock is on, Ranga hides its screen from the app switcher preview,
                  screenshots and screen recordings.
                </li>
              </List>
            </Section>

            <Section icon={Globe} title="Internet use" delay={0.45}>
              <p>
                Ranga uses the internet for two things. No personal or financial data is sent for
                either.
              </p>
              <p>
                <strong className="text-slate-900">Exchange rates.</strong> Ranga downloads daily
                currency rates from ExchangeRate-API (open.er-api.com). Only a request for the rates
                is sent. As with any internet request, that service can see your phone's IP address.
              </p>
              <p>
                <strong className="text-slate-900">App updates.</strong> Ranga uses Shorebird to
                download app updates. The update check sends basic technical information needed to
                deliver the right update, such as the app version and device platform. Shorebird can
                also see your IP address. For details, see Shorebird's own privacy policy at{' '}
                <a
                  href="https://shorebird.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline font-medium"
                >
                  shorebird.dev
                </a>
                .
              </p>
            </Section>

            <Section icon={Archive} title="Exports and backups" delay={0.5}>
              <p>These only happen when you choose.</p>
              <List>
                <li>
                  You can export your transactions as a CSV file, or save an encrypted backup of all
                  your data.
                </li>
                <li>
                  The file goes only where you choose: a folder, a cloud drive, or an app you share
                  it with.
                </li>
                <li>
                  A backup is encrypted with a password you set. We can't recover that password, and
                  a backup can't be restored without it.
                </li>
                <li>
                  Once a file is saved or shared, how it is handled depends on where you put it.
                </li>
              </List>
            </Section>

            <Section icon={Trash2} title="How long data is kept, and deleting it" delay={0.55}>
              <List>
                <li>
                  Your data stays on your phone until you delete it in the app or uninstall Ranga.
                </li>
                <li>Uninstalling Ranga removes all of its data from your phone.</li>
                <li>
                  Backups or exports you saved somewhere else stay there until you delete them.
                </li>
                <li>
                  We never receive your data, so there is nothing on our servers to delete.
                </li>
              </List>
            </Section>

            <Section icon={UserCheck} title="Your rights" delay={0.6}>
              <p>
                Rwanda's Law No. 058/2021 on the protection of personal data and privacy gives you
                rights over your personal data. With Ranga, you control your data directly on your
                phone. You can:
              </p>
              <List>
                <li>view it in the app;</li>
                <li>change it in the app;</li>
                <li>export it as a CSV file or an encrypted backup;</li>
                <li>delete it in the app, or by uninstalling Ranga.</li>
              </List>
              <p>
                If you have a question or a complaint, write to us at <EmailLink />.
              </p>
              <p>
                You can also contact Rwanda's data protection supervisory authority, the National
                Cyber Security Authority (NCSA).
              </p>
            </Section>

            <Section icon={Baby} title="Children" delay={0.65}>
              <p>
                Ranga is not directed at children under 16. We do not knowingly collect their data.
              </p>
            </Section>

            <Section icon={RefreshCw} title="Changes to this policy" delay={0.7}>
              <p>
                We may update this policy. When we do, we will change the effective date at the top
                of this page. If a change is significant, we will note it in the app or on this page.
              </p>
            </Section>
          </div>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-3xl shadow-lg border border-teal-100 p-8 md:p-10 mt-6"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 pt-2">Contact us</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                {COMPANY_NAME}
                <br />
                {COMPANY_ADDRESS}
              </p>
              <p>
                Privacy questions: <EmailLink />
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
