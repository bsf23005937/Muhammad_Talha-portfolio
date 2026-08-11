import './globals.css';

export const metadata = {
  title: 'Muhammad Talha Portfolio - Business Software Developer',
  description: 'Muhammad Talha builds practical business software for clinics, shops, supply workflows, dashboards, and small-business operations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
