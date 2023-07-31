module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}","./app/**/*.{js,ts,jsx,tsx}",    "../../packages/ui/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        theme: "light",
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        "light",

      ],
    },
  };
  