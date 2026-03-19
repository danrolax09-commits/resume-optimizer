import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'resume-optimizer',
  description: 'AI-powered resume and career optimization',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
