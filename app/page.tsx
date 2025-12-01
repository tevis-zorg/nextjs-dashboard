import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from './ui/fonts';
import Image from 'next/image'

export default function Page() {
  return (
    <main className="flex justify-center items-center min-h-screen flex-col p-6">
      {/* <div className={styles.shape}/> */}
      <div className="flex w-full items-stretch md:w- rounded-lg bg-blue-500 p-4 md:h-36">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"/>
          <p className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex flex-col items-center rounded-lg p-5 md:w-7/12 bg-gray-600 md:px-16 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={768}
            height={760}
            className="hidden md:block"
            alt='Screenshots of the dashboard project showing desktop version'
          />

          <Image
            src="/hero-mobile.png"
            width={460}
            height={620}
            alt="Screenshots of the dasboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
