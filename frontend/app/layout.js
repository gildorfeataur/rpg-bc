import Header from '../components/header/header';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body>
        <Header/>
        <main className="container mx-auto px-2 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'RPG-BC',
  description: 'Календар ігор Біла Церква',
}