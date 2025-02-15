// tailwind.config.mjs
export default {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#81AEFB",
        action: "#4E84A8",
        textPrimary: "#FFFFFF",
        bgPrimary: "#10131C",
        lines: "#F0F0F0",
        accent1: "#7f66ad",
        accent2: "#dbd5f4",
      },
      backgroundImage: {
        'gradient-hero': "linear-gradient(to bottom, #0D0F1B, #2B2E4A)",
      },
    },
  },
  plugins: [],
};
