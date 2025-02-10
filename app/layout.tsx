import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li><a className="zoom" href="/people">People</a></li>
              <li><a href="lukacike/planets">Planets</a></li>
              <li><a href="lukacike/films">Films</a></li>
              <li><a href="lukacike/species">Species</a></li>
              <li><a href="lukacike/vehicles">Vehicles</a></li>
              <li><a href="lukacike/starships">Starships</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          Star Wars API Application by Ewen Lukacik
          <br />
          Star Wars and all associated names and/or images are copyright Lucasfilm Ltd
        </footer>
      </body>
    </html>
  );
}
