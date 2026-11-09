import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { SITE_URL } from '../../seo/meta';

const LAST_UPDATED = '9 novembre 2026';

const Section: React.FC<{
  id?: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-28 border-t border-white/10 pt-8">
    <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">{title}</h2>
    <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </div>
  </section>
);

/**
 * Baseline Law 25 (Quebec) privacy policy. The content should be reviewed by a
 * Quebec privacy lawyer before it is presented as a final legal document.
 */
export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-28 pb-20 text-foreground">
      <Helmet>
        <title>Politique de confidentialité | AIXPT</title>
        <meta
          name="description"
          content="Politique de confidentialité d'AIXPT : renseignements collectés, utilisation, témoins, fournisseurs, conservation et droits des personnes au Québec."
        />
        <link rel="canonical" href={`${SITE_URL}/politique-de-confidentialite`} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>

        <header className="mt-8">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Dernière mise à jour : {LAST_UPDATED}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            AIXPT exploite le site <strong className="text-zinc-200">aixpt.ca</strong> et offre des
            services d'automatisation, d'agents vocaux et de chatbots IA au Québec. Cette politique
            explique quels renseignements nous collectionnons, pourquoi, avec qui ils peuvent être
            partagés et comment exercer vos droits.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <Section id="responsable" title="1. Responsable de la protection des renseignements">
            <p>
              Le responsable de la protection des renseignements personnels chez AIXPT est la
              direction. Pour toute question, demande d'accès ou plainte, écrivez à{' '}
              <a className="text-brand hover:text-white" href="mailto:jarias@aixpt.ca">
                jarias@aixpt.ca
              </a>{' '}
              ou appelez au{' '}
              <a className="text-brand hover:text-white" href="tel:+14188005085">
                418-800-5085
              </a>
              .
            </p>
            <p>AIXPT est établie au Québec, Canada.</p>
          </Section>

          <Section id="renseignements" title="2. Renseignements que nous collectons">
            <p>Selon votre interaction avec nous, nous pouvons collecter :</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-zinc-200">Coordonnées :</strong> nom, courriel, numéro de
                téléphone, entreprise et message envoyé par le formulaire de contact ou par courriel.
              </li>
              <li>
                <strong className="text-zinc-200">Conversations :</strong> messages envoyés au
                chatbot de démonstration et, pour la démo vocale, contenu de l'appel et transcription
                générée par notre fournisseur de téléphonie IA.
              </li>
              <li>
                <strong className="text-zinc-200">Rendez-vous :</strong> information nécessaire pour
                proposer ou confirmer un créneau de consultation.
              </li>
              <li>
                <strong className="text-zinc-200">Données techniques :</strong> adresse IP, type de
                navigateur, pages consultées, date et heure, journaux de sécurité et données de
                fonctionnement du site.
              </li>
              <li>
                <strong className="text-zinc-200">Préférences locales :</strong> choix enregistrés
                dans votre navigateur, comme la fermeture d'un avis ou la mise en cache du site pour
                le mode hors ligne.
              </li>
            </ul>
            <p>
              Les démos sont conçues pour des données fictives. Ne transmettez pas de renseignements
              sensibles (santé, dossier juridique confidentiel, numéro d'assurance sociale, données
              bancaires) dans une démo.
            </p>
          </Section>

          <Section id="fins" title="3. Pourquoi nous utilisons ces renseignements">
            <ul className="list-disc space-y-2 pl-5">
              <li>Répondre à vos demandes et vous donner une soumission ou une consultation.</li>
              <li>Faire fonctionner les démos vocales et de clavardage demandées.</li>
              <li>Proposer, confirmer et suivre un rendez-vous.</li>
              <li>Fournir, facturer et améliorer nos services.</li>
              <li>Assurer la sécurité, prévenir les abus et respecter nos obligations légales.</li>
              <li>Mesurer l'utilisation du site et améliorer son contenu, lorsque permis.</li>
            </ul>
            <p>
              Nous ne vendons pas vos renseignements personnels et nous ne les utilisons pas pour de
              la publicité comportementale sans votre consentement.
            </p>
          </Section>

          <Section id="consentement" title="4. Consentement et bases du traitement">
            <p>
              Nous collectons vos renseignements avec votre consentement, pour exécuter un contrat
              ou une démarche demandée, pour respecter une obligation légale, ou pour un intérêt
              légitime raisonnable. Lorsque la loi l'exige, nous demandons un consentement explicite
              et séparé.
            </p>
            <p>
              Vous pouvez retirer votre consentement en tout temps, sous réserve des obligations
              légales et des délais raisonnables de traitement.
            </p>
          </Section>

          <Section id="cookies" title="5. Témoins (cookies) et technologies similaires">
            <p>
              À ce jour, le site n'active aucun témoin publicitaire ou de suivi. Les mécanismes
              utilisés servent au fonctionnement du site, à la sécurité, à la mémorisation de vos
              préférences et, si vous l'avez déjà consulté, à la mise en cache du site pour le mode
              hors ligne.
            </p>
            <p>
              Si nous ajoutons un outil de mesure d'audience, de publicité ou un autre témoin non
              essentiel, nous afficherons un mécanisme de consentement avant son dépôt et nous
              mettrons cette politique à jour.
            </p>
            <p>
              Vous pouvez aussi supprimer ou bloquer les témoins et les données locales dans les
              réglages de votre navigateur. Certaines fonctions du site peuvent alors ne plus
              fonctionner normalement.
            </p>
          </Section>

          <Section id="communication" title="6. Communication à des fournisseurs et transferts">
            <p>
              Nous faisons appel à des fournisseurs de technologie pour exploiter le site et les
              démos, notamment pour l'hébergement, la téléphonie IA, les modèles de langage, les
              courriels et l'automatisation. Ces fournisseurs peuvent traiter des renseignements
              pour notre compte et selon nos instructions.
            </p>
            <p>
              Certains fournisseurs peuvent traiter ou conserver des données à l'extérieur du
              Québec, notamment aux États-Unis. Avant un tel transfert, nous tenons compte des
              exigences de la Loi 25 et nous encadrons le traitement par des mesures contractuelles
              et de sécurité raisonnables.
            </p>
            <p>
              Nous pouvons aussi communiquer des renseignements si la loi l'exige, si une autorité
              compétente le demande, ou pour protéger nos droits et la sécurité des personnes.
            </p>
          </Section>

          <Section id="conservation" title="7. Durée de conservation">
            <p>
              Nous conservons les renseignements seulement le temps nécessaire aux fins décrites
              ci-dessus, ou pendant la durée prévue par la loi. Les demandes de contact sont
              généralement conservées pendant 24 mois après le dernier échange. Les conversations
              de démonstration sont conservées le temps nécessaire à la démonstration et à
              l'amélioration du service, puis supprimées ou anonymisées.
            </p>
            <p>
              Les paramètres de conservation des fournisseurs de téléphonie et de modèles de
              langage peuvent s'appliquer. Nous privilégions les configurations qui limitent la
              conservation au strict nécessaire.
            </p>
          </Section>

          <Section id="droits" title="8. Vos droits">
            <p>Au Québec, vous pouvez notamment :</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>demander l'accès aux renseignements personnels que nous détenons à votre sujet;</li>
              <li>faire corriger des renseignements inexacts, incomplets ou équivoques;</li>
              <li>demander la suppression de renseignements lorsque la loi le permet;</li>
              <li>retirer votre consentement à une utilisation ou à une communication;</li>
              <li>demander la cessation de la diffusion d'un renseignement, dans les cas prévus;</li>
              <li>demander une copie portative de certains renseignements informatisés.</li>
            </ul>
            <p>
              Écrivez-nous à{' '}
              <a className="text-brand hover:text-white" href="mailto:jarias@aixpt.ca">
                jarias@aixpt.ca
              </a>
              . Nous répondons dans les 30 jours suivant la réception d'une demande, sauf délai
              supplémentaire permis par la loi. Nous pouvons vérifier votre identité avant de
              donner suite.
            </p>
            <p>
              Si vous n'êtes pas satisfait de notre réponse, vous pouvez communiquer avec la
              Commission d'accès à l'information du Québec (CAI).
            </p>
          </Section>

          <Section id="securite" title="9. Sécurité et incidents">
            <p>
              Nous appliquons des mesures techniques et organisationnelles raisonnables pour
              protéger les renseignements, notamment le contrôle d'accès, la limitation des
              données, la journalisation et la sécurité des fournisseurs. Aucune méthode de
              transmission ou de stockage n'est toutefois parfaitement sécurisée.
            </p>
            <p>
              Si un incident de confidentialité présente un risque sérieux de préjudice, nous
              prendrons les mesures requises, notamment aviser les personnes concernées et la CAI
              lorsque la loi l'exige.
            </p>
          </Section>

          <Section id="mineurs" title="10. Mineurs">
            <p>
              Le site et les démos ne s'adressent pas aux enfants de moins de 14 ans. Nous ne
              collectons pas sciemment leurs renseignements sans le consentement d'un parent ou
              d'un tuteur. Si vous croyez qu'un tel renseignement nous a été transmis, écrivez-nous
              pour que nous puissions le supprimer.
            </p>
          </Section>

          <Section id="modifications" title="11. Modifications de cette politique">
            <p>
              Nous pouvons modifier cette politique pour refléter nos pratiques, nos services ou la
              loi. La date de mise à jour est indiquée en haut de la page. Les changements
              importants seront présentés de façon raisonnable sur le site.
            </p>
          </Section>

          <Section id="contact" title="12. Nous joindre">
            <p>
              Pour une question sur cette politique ou sur vos renseignements personnels :
            </p>
            <p className="flex flex-col gap-1">
              <a
                className="inline-flex items-center gap-2 text-brand hover:text-white"
                href="mailto:jarias@aixpt.ca"
              >
                <Mail className="h-4 w-4" />
                jarias@aixpt.ca
              </a>
              <span>AIXPT · Québec, Canada</span>
              <Link className="text-brand hover:text-white" to="/contact">
                Formulaire de contact
              </Link>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
