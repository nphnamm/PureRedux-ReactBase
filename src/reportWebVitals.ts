import type { ReportCallback } from 'web-vitals';

const reportWebVitals = async (onPerfEntry?: ReportCallback) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
