import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #140d1f 50%, #0a0a0a 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(124, 58, 237, 0.18)",
            filter: "blur(80px)",
            top: -80,
            right: -60,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 120,
            fontFamily: "Georgia, serif",
            color: "#ffffff",
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ fontWeight: 500 }}>M</span>
          <span
            style={{
              fontStyle: "italic",
              color: "#c4b5fd",
              fontSize: 96,
              margin: "0 0.12em",
            }}
          >
            &amp;
          </span>
          <span style={{ fontWeight: 600 }}>J</span>
        </div>
        <p
          style={{
            marginTop: 24,
            fontSize: 22,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Marketing · Website
        </p>
        <p
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 720,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Desarrollo Web y Marketing Digital
        </p>
      </div>
    ),
    { ...size }
  );
}
