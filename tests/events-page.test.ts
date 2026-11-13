import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  eventClientTestimonialIds,
  eventClientTestimonials,
  testimonials,
} from "../src/content/testimonials.ts";
import {
  eventEnquiryErrors,
  submitEventEnquiry,
  validGuestCount,
} from "../src/lib/eventEnquiry.ts";
import {
  carouselActiveIndex,
  carouselRotationDegrees,
} from "../src/lib/testimonialCarousel.ts";
import { translate } from "../src/i18n/translations.ts";

const copyKeys = [
  "events.hero.title",
  "events.hero.support",
  "events.benefits.atmosphere.title",
  "events.benefits.atmosphere.body",
  "events.benefits.touch.title",
  "events.benefits.touch.body",
  "events.benefits.personal.title",
  "events.benefits.personal.body",
  "events.words.title",
  "events.organiser.quote",
  "events.clients.note",
  "events.answers.cost.body",
  "events.request.button",
  "events.form.preview",
  "events.form.notSent",
  "events.form.plansPlaceholder",
  "events.home.title",
  "events.home.link",
  "nav.events",
  "meta.pages.events.title",
];

describe("retreats page copy", () => {
  it("keeps the supplied English lines and a Spanish equivalent", () => {
    assert.equal(
      translate("en", "events.hero.title"),
      "Great events made even greater with Pluma.",
    );
    assert.equal(
      translate("en", "events.hero.support"),
      "A private massage experience, planned easily for your guests.",
    );
    assert.equal(
      translate("en", "events.form.preview"),
      "Preview only — enquiries aren’t sent yet",
    );
    assert.match(
      translate("en", "events.answers.cost.body"),
      /seven days before/,
    );
    assert.equal(
      translate("en", "events.organiser.quote"),
      "I organised an international art and wellbeing retreat in Valencia. Stephen provided holistic massage treatments for some of the retreat participants, which were greatly appreciated. His contribution complemented the retreat's focus on wellbeing and self-care, enhancing the holistic and restorative atmosphere I sought to cultivate.",
    );

    for (const key of copyKeys) {
      assert.notEqual(translate("en", key), key);
      assert.notEqual(translate("es", key), key);
    }
  });
});

describe("event client testimonials", () => {
  it("rotates five real studio clients, including the shortest and longest quotes", () => {
    const selected = eventClientTestimonials();
    assert.equal(selected.length, 5);
    assert.deepEqual(
      selected.map((item) => item.id),
      [...eventClientTestimonialIds],
    );

    for (const item of selected) {
      const source = testimonials.find((entry) => entry.id === item.id);
      assert.ok(source);
      assert.equal(item.quote, source.quote);
      assert.equal(item.name, source.name);
      assert.ok(item.image);
      assert.ok(item.countriesKey);
    }

    const lengths = testimonials.map((item) => item.quote.length);
    const shortest = Math.min(...lengths);
    const longest = Math.max(...lengths);
    const selectedLengths = selected.map((item) => item.quote.length);
    assert.ok(selectedLengths.includes(shortest));
    assert.ok(selectedLengths.includes(longest));
  });
});

describe("event testimonial carousel", () => {
  it("continues forward from the last face to the first", () => {
    const count = 5;
    const from = carouselRotationDegrees(4, count);
    const to = carouselRotationDegrees(5, count);
    assert.equal(to - from, 72);
    assert.equal(carouselActiveIndex(4, count), 4);
    assert.equal(carouselActiveIndex(5, count), 0);
    assert.equal(carouselActiveIndex(-1, count), 4);
  });
});

describe("event enquiry preview", () => {
  it("requires three or more whole guests and does not deliver", () => {
    assert.equal(validGuestCount("3"), true);
    assert.equal(validGuestCount("2"), false);
    assert.equal(validGuestCount("3.5"), false);
    assert.equal(validGuestCount(""), false);

    const invalid = eventEnquiryErrors({
      name: "",
      email: "not-an-email",
      location: "",
      when: "",
      guests: "2",
      gathering: "",
      plans: "",
    });
    assert.ok(invalid.name);
    assert.ok(invalid.email);
    assert.ok(invalid.guests);

    const input = {
      name: "Ada Organiser",
      email: "ada@example.com",
      location: "A villa near Jávea",
      when: "not sure yet",
      guests: "6",
      gathering: "villa",
      plans: "Massage between the afternoon workshops.",
    };
    assert.deepEqual(eventEnquiryErrors(input), {});

    const submission = submitEventEnquiry(input, "2026-11-04T12:00:00.000Z");
    assert.equal(submission.delivered, false);
    assert.equal(submission.reason, "preview");
    assert.equal(submission.record.status, "New enquiry");
    assert.equal(submission.record.guests, 6);
    assert.equal(submission.record.submittedAt, "2026-11-04T12:00:00.000Z");
    assert.equal(submission.record.gathering, "villa");
  });
});
