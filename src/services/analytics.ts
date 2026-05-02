export const GA_ID = import.meta.env.VITE_GA_ID || "";

export function initGA() {
  if (!GA_ID) return;
  
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
}

export function trackEvent(action: string, category: string, label: string, value?: number) {
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Add global type for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
