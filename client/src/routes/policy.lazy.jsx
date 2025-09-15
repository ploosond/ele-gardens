import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/policy")({
  component: Policy,
});

function Policy() {
  return (
    <div className="px-4 py-8 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <h1 className="mb-6 text-center text-2xl font-bold md:text-4xl">
        Datenschutzerklärung
      </h1>
      <div className="space-y-6 text-justify">
        <section>
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">
            1. Datenschutz auf einen Blick
          </h2>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können. Ausführliche Informationen
            zum Thema Datenschutz entnehmen Sie unserer unter diesem Text
            aufgeführten Datenschutzerklärung.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">
            Datenerfassung auf unserer Website
          </h2>
          <p>
            <strong>
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </strong>
            <br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
            dieser Website entnehmen.
          </p>
          <p>
            <strong>Wie erfassen wir Ihre Daten?</strong>
            <br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
            mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in
            ein Kontaktformular eingeben.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">
            2. Allgemeine Hinweise und Pflichtinformationen
          </h2>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
            Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend der gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">
            3. Datenerfassung auf unserer Website
          </h2>
          <p>
            <strong>Cookies</strong>
            <br />
            Die Internetseiten verwenden teilweise so genannte Cookies. Cookies
            richten auf Ihrem Rechner keinen Schaden an und enthalten keine
            Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher,
            effektiver und sicherer zu machen.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">
            4. Analyse Tools und Werbung
          </h2>
          <p>
            Diese Website nutzt Funktionen des Webanalysedienstes Google
            Analytics. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway,
            Mountain View, CA 94043, USA.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">
            5. Plugins und Tools
          </h2>
          <p>
            Diese Seite nutzt über eine API den Kartendienst Google Maps.
            Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain
            View, CA 94043, USA.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Policy;
