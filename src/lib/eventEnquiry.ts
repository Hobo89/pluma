export const EVENT_ENQUIRY_STATUS = "New enquiry" as const;

export type EventEnquiryInput = {
  name: string;
  email: string;
  location: string;
  when: string;
  guests: string;
  gathering: string;
  plans: string;
};

export type EventEnquiryField = keyof EventEnquiryInput;

export type EventEnquiryErrors = Partial<Record<EventEnquiryField, string>>;

export type EventEnquiryRecord = {
  name: string;
  email: string;
  location: string;
  when: string;
  guests: number;
  gathering: string;
  plans: string;
  submittedAt: string;
  status: typeof EVENT_ENQUIRY_STATUS;
};

export type EventEnquirySubmission = {
  delivered: false;
  reason: "preview";
  record: EventEnquiryRecord;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_KEYS: Record<Exclude<EventEnquiryField, "gathering">, string> = {
  name: "events.form.errors.name",
  email: "events.form.errors.email",
  location: "events.form.errors.location",
  when: "events.form.errors.when",
  guests: "events.form.errors.guests",
  plans: "events.form.errors.plans",
};

export function validGuestCount(value: string): boolean {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return false;
  const count = Number(trimmed);
  return Number.isInteger(count) && count >= 3;
}

export function eventEnquiryErrors(input: EventEnquiryInput): EventEnquiryErrors {
  const errors: EventEnquiryErrors = {};
  if (!input.name.trim()) errors.name = ERROR_KEYS.name;
  if (!EMAIL.test(input.email.trim())) errors.email = ERROR_KEYS.email;
  if (!input.location.trim()) errors.location = ERROR_KEYS.location;
  if (!input.when.trim()) errors.when = ERROR_KEYS.when;
  if (!validGuestCount(input.guests)) errors.guests = ERROR_KEYS.guests;
  if (!input.plans.trim()) errors.plans = ERROR_KEYS.plans;
  return errors;
}

export function toEventEnquiryRecord(
  input: EventEnquiryInput,
  submittedAt: string,
): EventEnquiryRecord {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    location: input.location.trim(),
    when: input.when.trim(),
    guests: Number(input.guests.trim()),
    gathering: input.gathering,
    plans: input.plans.trim(),
    submittedAt,
    status: EVENT_ENQUIRY_STATUS,
  };
}

/**
 * Preview path only. Notion is not connected, so this never delivers a record.
 * The mapped record is the shape to send once a database id exists.
 */
export function submitEventEnquiry(
  input: EventEnquiryInput,
  submittedAt: string = new Date().toISOString(),
): EventEnquirySubmission {
  return {
    delivered: false,
    reason: "preview",
    record: toEventEnquiryRecord(input, submittedAt),
  };
}
