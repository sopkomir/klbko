import { NextResponse, type NextRequest } from "next/server";

// Hlavná adresa aplikácie. Návštevy na klbko.vercel.app sa presmerujú sem,
// aby sa v prehliadači a v odkazoch na prípravy zobrazovala len táto doména.
// Presmerovanie je zapnuté iba vtedy, keď je vo Verceli nastavená premenná
// KLBKO_DOMAIN (napríklad klbko.zavretaskola.sk). Bez nej sa nič nemení.
const OLD_HOST = "klbko.vercel.app";

export function middleware(req: NextRequest) {
  const target = process.env.KLBKO_DOMAIN;
  const host = req.headers.get("host") || "";
  if (!target || host !== OLD_HOST || target === OLD_HOST) return NextResponse.next();
  const url = new URL(req.nextUrl.pathname + req.nextUrl.search, `https://${target}`);
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
