/**
 * Customer-facing English Voucher Terms.
 *
 * Version 1.1 — 15 September 2026.
 * Internal operating procedure and legal-reference notes from the source
 * document must never render here.
 */

export type VoucherTermsSection = {
  title: string;
  paragraphs: string[];
};

export const voucherTermsEn = {
  version: "Version 1.1 — 15 September 2026",
  intro:
    "These terms apply to Pluma Studio massage vouchers arranged on or after 15 September 2026. The website provides information and an inquiry route; it does not provide an online checkout.",
  sections: [
    {
      title: "1. Scope",
      paragraphs: [
        "These terms apply to Pluma Studio massage vouchers arranged on or after 15 September 2026. The website provides information and an inquiry route; it does not provide an online checkout.",
      ],
    },
    {
      title: "2. Available vouchers and prices",
      paragraphs: [
        "All prices are total prices. A voucher contains only the number and duration of sessions confirmed when it is arranged.",
      ],
    },
    {
      title: "3. Inquiries and confirmation",
      paragraphs: [
        "Customers interested in a voucher should use the Cal.com inquiry link on this page.",
        "Before a voucher is confirmed, Pluma will identify the selected option, total price, validity rules and applicable terms. A voucher exists only once Pluma has expressly confirmed it.",
      ],
    },
    {
      title: "4. Issuance and record",
      paragraphs: [
        "The customer will receive a digital voucher confirmation by email. Pluma will maintain the authoritative record of the voucher, its owner, activation date, expiration date, appointments and remaining balance.",
        "If the customer-facing record and Pluma’s internal record differ, Pluma will investigate the discrepancy and provide the customer with a corrected written record.",
      ],
    },
    {
      title: "5. Activation and validity",
      paragraphs: [
        "The first session must take place within 30 days after the voucher is issued.",
        "The voucher validity period begins on the date of that first session:",
        "Five-session vouchers expire three calendar months after the first session.",
        "Ten-session vouchers expire six calendar months after the first session.",
        "The exact expiration date will be communicated to the customer.",
      ],
    },
    {
      title: "6. Booking and availability",
      paragraphs: [
        "Every session must be booked separately through the Pluma booking calendar and is subject to availability.",
        "A voucher does not create a right to recurring appointments, particular dates or particular times. All sessions must take place before the applicable expiration date.",
      ],
    },
    {
      title: "7. Customer cancellation and non-attendance",
      paragraphs: [
        "An appointment may be changed or canceled without loss of a session when the customer provides at least 24 hours’ notice.",
        "If the customer cancels with less than 24 hours’ notice, or does not attend the appointment, one session will be deducted from the voucher.",
        "Pluma may waive the deduction where illness, an emergency or another exceptional circumstance reasonably prevented timely notice.",
      ],
    },
    {
      title: "8. Cancellation by Pluma",
      paragraphs: [
        "If Pluma cancels an appointment, no session will be deducted. The customer may select another available appointment.",
        "If Pluma becomes unable to provide the remaining sessions within the voucher period, the customer may request a refund of the amount paid for the unused sessions. The unused-session value is calculated from the voucher price divided by the original number of sessions included.",
      ],
    },
    {
      title: "9. Extension",
      paragraphs: [
        "A customer prevented from using the voucher because of illness, pregnancy or another reasonable circumstance may request one 30-day pause or extension.",
        "The customer should make the request before expiration wherever reasonably possible. Pluma will not require more personal information than is reasonably necessary to assess the request.",
      ],
    },
    {
      title: "10. Transfer and sharing",
      paragraphs: [
        "The whole voucher may be transferred to another person before the first session, provided it remains entirely unused.",
        "After activation, the voucher is personal to its first user. It may not be divided, shared or resold.",
      ],
    },
    {
      title: "11. Price changes",
      paragraphs: [
        "A later change to Pluma’s public prices will not change the number of sessions or require a supplement for a valid existing voucher.",
      ],
    },
    {
      title: "12. Withdrawal and refunds",
      paragraphs: [
        "Where the voucher is arranged through a distance contract, the customer has the statutory right to withdraw within 14 calendar days unless a lawful exception applies.",
        "If the customer expressly asks to use the voucher during that period and then withdraws, Pluma may deduct the proportionate value of services already provided where legally permitted.",
        "After the applicable withdrawal period, no refund is offered solely because the customer has changed their mind. This does not limit any mandatory consumer right or the remedies available where Pluma cannot provide the agreed service.",
        "Withdrawal or refund requests may be made using the contact details published in Pluma’s legal notice. A clear statement identifying the customer and voucher is sufficient.",
      ],
    },
    {
      title: "13. Applicable version",
      paragraphs: [
        "The terms displayed on the website when the voucher is confirmed will govern that voucher and will be recorded with it.",
        "Pluma will not change the applicable terms retrospectively. If the website terms are updated in the future, the new version will apply only to vouchers confirmed after its stated effective date, unless a change is required by law or benefits the customer.",
      ],
    },
    {
      title: "14. Business and contact information",
      paragraphs: [
        "The following details must be completed before public launch.",
        "Customer contact: stephen@pluma.life",
        "These voucher terms operate together with Pluma’s Legal Notice and Privacy Policy.",
      ],
    },
  ] as const satisfies readonly VoucherTermsSection[],
} as const;
