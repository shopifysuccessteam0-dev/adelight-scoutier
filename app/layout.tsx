import './globals.css';

export const metadata = {
  title: 'Adelight Scoutier',
  description: 'Campaign & Creator Hub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
