import type { ReactNode } from "react";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { PendingNote } from "../components/PendingNote";
import { processingInventory } from "../config/processing";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

export type LegalPageId =
  | "notice"
  | "privacy"
  | "cookies"
  | "terms"
  | "bonoTerms";

type LegalPageProps = { page: LegalPageId };

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="psl-legal__section">
      <h2 className="psl-legal__heading">{title}</h2>
      {children}
    </section>
  );
}

function ProcessingTable() {
  const { t, language } = useLanguage();
  const headers = "legalPages.privacy.inventoryHeaders";

  return (
    <div className="psl-legal__table-wrap">
      <table className="psl-legal__table">
        <thead>
          <tr>
            <th scope="col">{t(`${headers}.data`)}</th>
            <th scope="col">{t(`${headers}.purpose`)}</th>
            <th scope="col">{t(`${headers}.basis`)}</th>
            <th scope="col">{t(`${headers}.recipients`)}</th>
            <th scope="col">{t(`${headers}.retention`)}</th>
          </tr>
        </thead>
        <tbody>
          {processingInventory.map((entry) => (
            <tr key={entry.id}>
              <th scope="row">{entry.data[language]}</th>
              <td>{entry.purpose[language]}</td>
              <td>{entry.basis[language]}</td>
              <td>{entry.recipients[language]}</td>
              <td>{entry.retention[language]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NoticeBody() {
  const { t } = useLanguage();
  const k = "legalPages.notice";

  return (
    <>
      <p className="psl-copy">{t(`${k}.intro`)}</p>
      <Section title={t(`${k}.operatorTitle`)}>
        <p className="psl-copy">{t(`${k}.operatorName`)}</p>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.operatorPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.contactTitle`)}>
        <p className="psl-copy">
          {t(`${k}.contactBody`, { email: site.email })}
        </p>
      </Section>
      <Section title={t(`${k}.activityTitle`)}>
        <p className="psl-copy">{t(`${k}.activityBody`)}</p>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.activityPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.complaintsTitle`)}>
        <p className="psl-copy">
          {t(`${k}.complaintsBody`, { email: site.email })}
        </p>
      </Section>
      <Section title={t(`${k}.linksTitle`)}>
        <p className="psl-copy">{t(`${k}.linksBody`)}</p>
      </Section>
    </>
  );
}

function PrivacyBody() {
  const { t } = useLanguage();
  const k = "legalPages.privacy";

  return (
    <>
      <p className="psl-copy">{t(`${k}.intro`)}</p>
      <Section title={t(`${k}.controllerTitle`)}>
        <p className="psl-copy">
          {t(`${k}.controllerBody`, { email: site.email })}
        </p>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.controllerPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.inventoryTitle`)}>
        <p className="psl-copy">{t(`${k}.inventoryIntro`)}</p>
        <ProcessingTable />
      </Section>
      <Section title={t(`${k}.healthTitle`)}>
        <p className="psl-copy">{t(`${k}.healthBody`)}</p>
      </Section>
      <Section title={t(`${k}.marketingTitle`)}>
        <p className="psl-copy">{t(`${k}.marketingBody`)}</p>
      </Section>
      <Section title={t(`${k}.transfersTitle`)}>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.transfersPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.rightsTitle`)}>
        <p className="psl-copy">
          {t(`${k}.rightsBody`, { email: site.email })}
        </p>
      </Section>
    </>
  );
}

function CookiesBody() {
  const { t } = useLanguage();
  const k = "legalPages.cookies";

  return (
    <>
      <p className="psl-copy">{t(`${k}.intro`)}</p>
      <Section title={t(`${k}.necessaryTitle`)}>
        <p className="psl-copy">{t(`${k}.necessaryBody`)}</p>
      </Section>
      <Section title={t(`${k}.analyticsTitle`)}>
        <p className="psl-copy">{t(`${k}.analyticsBody`)}</p>
      </Section>
      <Section title={t(`${k}.thirdPartyTitle`)}>
        <p className="psl-copy">{t(`${k}.thirdPartyBody`)}</p>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.thirdPartyPending`)}
        </PendingNote>
      </Section>
    </>
  );
}

function TermsBody() {
  const { t } = useLanguage();
  const k = "legalPages.terms";

  return (
    <>
      <p className="psl-legal__draft" role="note">
        {t(`${k}.draftBanner`)}
      </p>
      <p className="psl-copy">{t(`${k}.intro`)}</p>
      <Section title={t(`${k}.serviceTitle`)}>
        <p className="psl-copy">{t(`${k}.serviceBody`)}</p>
      </Section>
      <Section title={t(`${k}.priceTitle`)}>
        <p className="psl-copy">{t(`${k}.priceBody`)}</p>
      </Section>
      <Section title={t(`${k}.paymentTitle`)}>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.paymentPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.cancellationTitle`)}>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.cancellationPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.withdrawalTitle`)}>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.withdrawalPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.complaintsTitle`)}>
        <p className="psl-copy">
          {t(`${k}.complaintsBody`, { email: site.email })}
        </p>
      </Section>
    </>
  );
}

function BonoTermsBody() {
  const { t } = useLanguage();
  const k = "legalPages.bonoTerms";

  return (
    <>
      <p className="psl-legal__draft" role="note">
        {t(`${k}.draftBanner`)}
      </p>
      <p className="psl-copy">{t(`${k}.intro`)}</p>
      <Section title={t(`${k}.whatTitle`)}>
        <p className="psl-copy">{t(`${k}.whatBody`)}</p>
      </Section>
      <Section title={t(`${k}.priceTitle`)}>
        <p className="psl-copy">{t(`${k}.priceBody`)}</p>
      </Section>
      <Section title={t(`${k}.validityTitle`)}>
        <p className="psl-copy">{t(`${k}.validityBody`)}</p>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.validityPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.transferTitle`)}>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.transferPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.unusedTitle`)}>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.unusedPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.deliveryTitle`)}>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.deliveryPending`)}
        </PendingNote>
      </Section>
      <Section title={t(`${k}.withdrawalTitle`)}>
        <PendingNote label={t("legalPages.pendingItem")}>
          {t(`${k}.withdrawalPending`)}
        </PendingNote>
      </Section>
    </>
  );
}

const bodies: Record<LegalPageId, () => ReactNode> = {
  notice: NoticeBody,
  privacy: PrivacyBody,
  cookies: CookiesBody,
  terms: TermsBody,
  bonoTerms: BonoTermsBody,
};

export function LegalPage({ page }: LegalPageProps) {
  const { t } = useLanguage();
  const Body = bodies[page];

  return (
    <PageContainer>
      <PageMeta page={page} />
      <p className="psl-eyebrow">{t("footer.legalTitle")}</p>
      <h1 className="psl-title">{t(`legalPages.${page}.title`)}</h1>
      <p className="psl-legal__banner" role="note">
        {t("legalPages.pendingBanner")}
      </p>
      <div className="psl-legal">
        <Body />
      </div>
    </PageContainer>
  );
}
