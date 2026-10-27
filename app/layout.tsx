/**
 * Pass-through root layout. The real root layout (with <html lang>) is
 * app/[locale]/layout.tsx, so each locale gets the right language attribute.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
