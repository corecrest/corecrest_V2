import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Globe,
  BarChart3,
  KeyRound,
  Users,
  Bell,
  FileUp,
  Archive,
  MessageSquare,
  Baby,
  RefreshCw,
  Mail,
} from 'lucide-react';
import SEO from '../components/SEO';

// The wording of this policy is fixed: it is what the Play Data safety form
// declares, so it is only changed alongside the app itself.
const LAST_UPDATED = '15 September 2026';

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

export default function MontraPrivacyPolicy() {
  return (
    <>
      <SEO
        title="Montra Privacy Policy | CoreCrest"
        description="Montra stores everything on your device and sends nothing to us. There is no account, no sign-in and no server. The full privacy policy for the Montra Android app."
        keywords="Montra privacy policy, Montra app, personal finance app Rwanda, offline finance app, CoreCrest"
        ogTitle="Montra Privacy Policy | CoreCrest"
        ogDescription="Montra does not collect your data. There is no account, no sign-in and no server holding a copy of anything you enter."
        ogUrl="https://corecrest.tech/montra/privacy-policy"
        canonicalUrl="https://corecrest.tech/montra/privacy-policy"
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
                Montra by CoreCrest
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Last updated: {LAST_UPDATED}
            </p>
          </motion.div>

          {/* Short version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-3xl shadow-lg border border-teal-100 p-8 md:p-10 mb-8"
          >
            <p className="text-lg font-semibold text-slate-900 leading-relaxed">
              Montra does not collect your data. There is no account, no sign-in, and no server
              holding a copy of anything you enter. It all stays on your phone, encrypted, where we
              cannot read it.
            </p>
          </motion.div>

          <div className="space-y-6">
            <Section icon={Lock} title="What is stored, and where" delay={0.2}>
              <p>
                Montra is a personal finance app for Android. It records accounts, balances,
                transactions, plans, budgets, loans and savings goals. It is sold nowhere and costs
                nothing.
              </p>
              <p>
                Everything you enter is stored locally on your device, in a database encrypted with a
                key held in the Android Keystore. The app is opened with your fingerprint or your
                device screen lock. There is no user account, no sign-in, and no server holding a
                copy. We cannot read any of it, and there is no mechanism by which we could.
              </p>
              <p>
                The app keeps a diagnostic log on the device. It records what kind of thing happened
                — which part of the app, which operation, the type of account, the class of any
                error. It never records amounts, names, merchants, or the contents of messages. You
                can read the whole log on screen, and it is shared only if you choose to share it and
                choose the recipient.
              </p>
            </Section>

            <Section icon={Globe} title="What leaves your device" delay={0.25}>
              <p>
                One request. The app asks a public exchange-rate service what a currency is worth, so
                balances in different currencies can be shown as one total. The request contains no
                balances, no account details, no name and no identifier. It is not made at all unless
                you hold more than one currency. The services are Frankfurter (frankfurter.dev) and,
                as a fallback, open.er-api.com.
              </p>
              <p className="font-semibold text-slate-900">Nothing else leaves your device.</p>
            </Section>

            <Section icon={BarChart3} title="Analytics and crash reporting" delay={0.3}>
              <p>
                There are none. No analytics SDK, no advertising SDK, no crash-reporting service.
                Nothing about your use of the app is transmitted anywhere.
              </p>
            </Section>

            <Section icon={KeyRound} title="Permissions" delay={0.35}>
              <p>Each permission has a single purpose.</p>
              <ul className="space-y-3 pl-6 list-disc marker:text-teal-600">
                <li>
                  <strong className="text-slate-900">Phone (making calls)</strong> — only to place a
                  mobile-money USSD string on the line when you start a payment. The app composes the
                  string; the mobile network then asks for your PIN in its own prompt. The app never
                  sees, stores or transmits the PIN, and does not learn whether a payment succeeded
                  except from a message the network sends you. It makes no other kind of call.
                </li>
                <li>
                  <strong className="text-slate-900">Biometrics</strong> — only to unlock the app. No
                  biometric data is read, stored or transmitted; Android performs the check.
                </li>
                <li>
                  <strong className="text-slate-900">Internet</strong> — only for the exchange-rate
                  request above.
                </li>
                <li>
                  <strong className="text-slate-900">Notifications (showing them)</strong> — only to
                  show reminders, if you turn reminders on. This lets the app put a notification on
                  your screen, and gives it no ability to read anyone else's.
                </li>
                <li>
                  <strong className="text-slate-900">Run at startup</strong> — only to put
                  already-scheduled reminders back after your phone restarts.
                </li>
                <li>
                  <strong className="text-slate-900">Vibrate</strong> — only for a reminder, unless
                  its channel is silenced in Android.
                </li>
              </ul>
            </Section>

            <Section icon={Users} title="Your contacts" delay={0.4}>
              <p>
                The app holds no contacts permission and cannot read your address book. When you pay
                somebody new, you can tap a button and Android shows its own contact list. You pick
                one person, and the system hands over that one row — a name and a number — and
                nothing else. The app cannot search, count or look at your contacts at any other
                moment. The number goes into the payment field as if you had typed it. The name is
                not saved unless you choose to save it, because it belongs to somebody else and could
                otherwise travel in a backup or an export.
              </p>
            </Section>

            <Section icon={Bell} title="Reminders" delay={0.45}>
              <p>Reminders are off by default. You switch them on.</p>
              <p>
                They are worked out from your own ledger on the device, then handed to Android to
                show at the time you choose, and nothing is transmitted — no push service, no server
                that knows what is due. A reminder never contains an amount: it names what is due and
                how many things are due, and on a lock screen it is reduced to the fact that the app
                has something. A record of reminders shown is kept on the device, encrypted, for 90
                days. You can read it, dismiss entries, and turn reminders off.
              </p>
            </Section>

            <Section icon={FileUp} title="Importing a statement" delay={0.5}>
              <p>
                You can hand the app a CSV or PDF statement. It is read on your phone — opened, read,
                closed — and nothing about it is uploaded; there is no mechanism by which its
                contents could reach us.
              </p>
              <p>
                Such a file carries your name, an account number, and every transaction over the
                period, so:
              </p>
              <ul className="space-y-2 pl-6 list-disc marker:text-teal-600">
                <li>
                  you choose the file every time, through Android's own picker — the app cannot see or
                  list your files;
                </li>
                <li>only the rows you tick are stored;</li>
                <li>nothing is written until the rows have been shown to you;</li>
                <li>
                  where the file says which account it belongs to, that is checked against the account
                  you chose, and a mismatch is refused;
                </li>
                <li>the file itself is not copied or remembered.</li>
              </ul>
              <p>
                A password-protected PDF is refused rather than opened. The app never asks for, stores
                or transmits the password to a statement.
              </p>
            </Section>

            <Section icon={Archive} title="Backups and exports" delay={0.55}>
              <p>
                A backup is a file you create deliberately, encrypted with a passphrase you choose,
                going wherever you send it. We never receive it, and we cannot recover a lost ledger
                or a forgotten passphrase.
              </p>
              <p>
                A backup or an export can contain names from your beneficiary list, which is why the
                app asks before saving one.
              </p>
              <p>
                The app can also export transactions as CSV. That file is not encrypted — it cannot
                be, since a spreadsheet has to read it — and it holds the dates, payees and amounts of
                whatever was exported. The app says so before writing one.
              </p>
            </Section>

            <Section icon={MessageSquare} title="Notification access (optional)" delay={0.6}>
              <p>
                This is a separate thing from the reminders above. The app reading bank notifications,
                and the app showing you reminders, are two features. They are switched on separately,
                and neither one requires the other.
              </p>
              <p>If you turn notification access on:</p>
              <ul className="space-y-2 pl-6 list-disc marker:text-teal-600">
                <li>
                  Access is off by default. You grant it by hand in Android's own settings, and you
                  can withdraw it there at any time.
                </li>
                <li>
                  Only notifications whose sender matches a known short code, arriving through an app
                  that carries SMS, are kept. Everything else is discarded immediately and never
                  written to storage.
                </li>
                <li>
                  What is kept is stored on the device, encrypted, and parsed there. It is never
                  transmitted anywhere.
                </li>
                <li>
                  Nothing is added to your ledger automatically. A recognised message becomes a draft
                  you confirm or dismiss.
                </li>
              </ul>
            </Section>

            <Section icon={Baby} title="Children" delay={0.65}>
              <p>
                Montra is not directed at children. No information is knowingly collected from anyone.
              </p>
            </Section>

            <Section icon={RefreshCw} title="Changes to this policy" delay={0.7}>
              <p>
                If the app ever begins collecting information, this policy will be updated before that
                version is released, and the change described in the app's release notes.
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
              <h2 className="text-2xl font-bold text-slate-900 pt-2">Contact</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                The app names its maker on the screen it opens with and in Settings under About —
                “Montra by CoreCrest” — so the app in your hand can be matched to this page and to the
                address below without taking anybody's word for it.
              </p>
              <p>
                Write to us at{' '}
                <a
                  href="mailto:info@corecrest.tech"
                  className="text-teal-600 hover:underline font-medium"
                >
                  info@corecrest.tech
                </a>
                .
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
