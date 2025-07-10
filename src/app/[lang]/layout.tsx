import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import { getDictionary } from "@/app/lib/dictionaries";
import { Locale } from "@/app/lib/i18n-config";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Social Feed",
  description: "A multilingual social feed application",
};

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const t = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <ThemeProvider>
          <ReactQueryProvider>
            <Header welcomeMessage={t.welcome} themeLabels={t.theme} />
            <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
