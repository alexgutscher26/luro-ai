import type { Config } from "tailwindcss"

const svgToDataUri = require("mini-svg-data-uri");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        primaryLight: {
          DEFAULT: "hsl(var(--primary-light))",
          foreground: "hsl(var(--primary-light-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        "heading": ["var(--font-satoshi)"],
        "default": ["var(--font-inter)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "grid": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "background-shine": {
          "from": { "backgroundPosition": "0 0" },
          "to": { "backgroundPosition": "-200% 0" }
        },
        "marquee": {
          "from": { transform: "translateX(0)" },
          "to": { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "ripple": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", },
          "50%": { transform: "translate(-50%, -50%) scale(0.9)", },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)", },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)", },
        },
        "loading": {
          "to": {
            transform: "rotate(360deg)"
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "grid": "grid 15s linear infinite",
        "background-shine": "background-shine 2s linear infinite",
        "marquee": "marquee var(--duration) linear infinite",
        "ripple": "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        "spotlight": "spotlight 2s ease .75s 1 forwards",
        "loading": "loading 0.6s linear infinite",
      },
      spacing: {
        "1/8": "12.5%",
        // Add consistent spacing scale
        "0.5": "0.125rem",   // 2px
        "1.5": "0.375rem",   // 6px
        "2.5": "0.625rem",   // 10px
        "3.5": "0.875rem",   // 14px
        "4.5": "1.125rem",   // 18px
        "5.5": "1.375rem",   // 22px
        "6.5": "1.625rem",   // 26px
        "7.5": "1.875rem",   // 30px
        "8.5": "2.125rem",   // 34px
        "9.5": "2.375rem",   // 38px
        "10.5": "2.625rem",  // 42px
        "11.5": "2.875rem",  // 46px
        "12.5": "3.125rem",  // 50px
        "13": "3.25rem",     // 52px
        "14.5": "3.625rem",  // 58px
        "15": "3.75rem",     // 60px
        "17": "4.25rem",     // 68px
        "18": "4.5rem",      // 72px
        "19": "4.75rem",     // 76px
        "21": "5.25rem",     // 84px
        "22": "5.5rem",      // 88px
        "26": "6.5rem",      // 104px
        "28": "7rem",        // 112px
        "30": "7.5rem",      // 120px
        "34": "8.5rem",      // 136px
        "36": "9rem",        // 144px
        "38": "9.5rem",      // 152px
        "42": "10.5rem",     // 168px
        "44": "11rem",       // 176px
        "46": "11.5rem",     // 184px
        "50": "12.5rem",     // 200px
        "54": "13.5rem",     // 216px
        "58": "14.5rem",     // 232px
        "62": "15.5rem",     // 248px
        "66": "16.5rem",     // 264px
        "70": "17.5rem",     // 280px
        "74": "18.5rem",     // 296px
        "78": "19.5rem",     // 312px
        "82": "20.5rem",     // 328px
        "86": "21.5rem",     // 344px
        "90": "22.5rem",     // 360px
        "94": "23.5rem",     // 376px
        "98": "24.5rem",     // 392px
        "102": "25.5rem",    // 408px
        "106": "26.5rem",    // 424px
        "110": "27.5rem",    // 440px
        "114": "28.5rem",    // 456px
        "118": "29.5rem",    // 472px
        "122": "30.5rem",    // 488px
        "126": "31.5rem",    // 504px
        "130": "32.5rem",    // 520px
      },
    },
  },
  plugins: [
    addVariablesForColors,
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
};

export default config