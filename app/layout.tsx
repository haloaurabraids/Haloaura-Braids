import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haloaura Braids | Premium Braiding & Beauty Salon",
  description: "Feminine, elegant, and high-end professional braiding and protective styles. Book your appointment with Haloaura Braids today and leave with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster 
            position="top-center" 
            toastOptions={{
              success: {
                style: {
                  background: '#dcfce7', // light green (green-100)
                  color: '#000000', // black text
                  border: '1px solid #bbf7d0', // green-200
                },
              },
              error: {
                style: {
                  background: '#fee2e2', // light red (red-100)
                  color: '#000000', // black text
                  border: '1px solid #fecaca', // red-200
                },
              },
              style: {
                background: 'var(--toast-bg)', 
                color: 'var(--toast-text)', 
                border: '1px solid var(--toast-border)',
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
