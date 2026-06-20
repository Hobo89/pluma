/** Your Cal.com booking link, e.g. "your-name/massage" */
export const calLink = import.meta.env.VITE_CALCOM_LINK ?? "";

export const calConfigured = calLink.length > 0;
