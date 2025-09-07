import "../../../globals.css";
import { Toaster } from "@/app/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#EAEAEA]">
        <Toaster
          position="top-right" // posisi toast di atas tengah
          richColors // aktifkan warna variant
          toastOptions={{
            duration: 2000, // durasi toast
            style: {
              background: "#008080", // background teal dengan 20% opacity
              color: "#FAFAFA", // text berwarna FAFAFA
              fontWeight: "600",
              borderRadius: "0.5rem",
              padding: "1rem",
              width:"fit-content",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
