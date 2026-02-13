import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Gilbert Air Strike — Development-First Flag Football";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const svg = await readFile(join(process.cwd(), "public/images/asset8-new.svg"), "utf-8");
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", width: "100%", height: "100%",
        background: "#0a0a0a", gap: 24,
      }}>
        <img src={src} width={160} height={160} />
        <div style={{
          fontSize: 64, fontWeight: 700, color: "#ffffff",
          letterSpacing: 2,
        }}>
          GILBERT AIR STRIKE
        </div>
        <div style={{
          fontSize: 22, color: "rgba(255,255,255,0.4)",
          letterSpacing: 6, textTransform: "uppercase",
        }}>
          Development-First Flag Football
        </div>
      </div>
    ),
    { ...size }
  );
}
