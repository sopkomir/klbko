import Script from 'next/script';
import { BODY } from './body';
export default function Studio({ share }: { share?: string }) {
  return (
    <>
      {share && <script dangerouslySetInnerHTML={{ __html: `window.KLBKO_SHARE=${JSON.stringify(share)}` }} />}
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
      <Script src="/studio.js" strategy="afterInteractive" />
    </>
  );
}
