// Helper pour appeler Clarity de manière sûre
export function clarityEvent(eventName: string) {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName);
  }
}

export function clarityTag(key: string, value: string) {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', key, value);
  }
}

export function clarityIdentify(customId: string, sessionId?: string, pageId?: string) {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('identify', customId, sessionId, pageId);
  }
}

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}
