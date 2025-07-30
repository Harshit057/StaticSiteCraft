export const getThemeStyles = (theme) => {
  const themes = {
    light: `
      :root {
        --primary-color: #3b82f6;
        --primary-hover: #2563eb;
        --text-primary: #1f2937;
        --text-secondary: #6b7280;
        --bg-primary: #ffffff;
        --bg-secondary: #f9fafb;
        --border-color: #e5e7eb;
        --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }
    `,
    dark: `
      :root {
        --primary-color: #60a5fa;
        --primary-hover: #3b82f6;
        --text-primary: #f9fafb;
        --text-secondary: #d1d5db;
        --bg-primary: #111827;
        --bg-secondary: #1f2937;
        --border-color: #374151;
        --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      }
    `,
    corporate: `
      :root {
        --primary-color: #1e40af;
        --primary-hover: #1e3a8a;
        --text-primary: #1f2937;
        --text-secondary: #6b7280;
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --border-color: #e2e8f0;
        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
    `,
    funky: `
      :root {
        --primary-color: #ec4899;
        --primary-hover: #db2777;
        --text-primary: #1f2937;
        --text-secondary: #6b7280;
        --bg-primary: #ffffff;
        --bg-secondary: #fdf2f8;
        --border-color: #fce7f3;
        --shadow: 0 10px 15px -3px rgba(236, 72, 153, 0.1);
      }
    `,
    minimal: `
      :root {
        --primary-color: #000000;
        --primary-hover: #374151;
        --text-primary: #000000;
        --text-secondary: #6b7280;
        --bg-primary: #ffffff;
        --bg-secondary: #ffffff;
        --border-color: #e5e7eb;
        --shadow: none;
      }
    `
  };
  
  return themes[theme] || themes.light;
}; 