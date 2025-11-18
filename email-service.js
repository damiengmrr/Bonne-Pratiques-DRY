// Simule la lib externe (ex: sendgrid)
const sendgrid = {
    async send({ to, subject, text }) {
      console.log('[sendgrid] Email envoyé à', to, 'Sujet:', subject);
      console.log(text);
    },
  };
  
  // Service MÉTIER (version mauvaise : couplage fort)
  class EmailService {
    async sendWelcomeEmail(user) {
      const subject = 'Bienvenue sur notre plateforme';
      const text = `Bonjour ${user.firstName},
  
  Merci pour votre inscription.
  
  À bientôt !`;
  
      // Couplage direct au "détail" sendgrid
      await sendgrid.send({
        to: user.email,
        subject,
        text,
      });
    }
  }
  
  // Petit exemple d’utilisation
  const user = { firstName: 'Kenan', email: 'kenan@example.com' };
  const emailService = new EmailService();
  emailService.sendWelcomeEmail(user);
// Simule la lib externe (ex: sendgrid)
const sendgrid = {
  async send({ to, subject, text }) {
    console.log('[sendgrid] Email envoyé à', to, 'Sujet:', subject);
    console.log(text);
  },
};

// --- Abstraction : contrat de provider d'email ---
// Ici on pose juste une forme attendue : un objet avec une méthode async sendMail(options)
// Pas besoin d'interface formelle en JS, on documente le contrat par le code.

// Implémentation concrète : SendGrid
class SendGridMailProvider {
  async sendMail({ to, subject, text }) {
    // Détail technique caché derrière l'abstraction
    await sendgrid.send({ to, subject, text });
  }
}

// Implémentation pour les tests : FakeMailProvider
class FakeMailProvider {
  constructor() {
    this.sentEmails = [];
  }

  async sendMail({ to, subject, text }) {
    const email = { to, subject, text };
    this.sentEmails.push(email);
    console.log('[fake] Email stocké (test uniquement) :', email);
  }
}

// Service MÉTIER (ne dépend plus de sendgrid directement)
class EmailService {
  constructor(mailProvider) {
    this.mailProvider = mailProvider; // dépend d'une ABSTRACTION
  }

  async sendWelcomeEmail(user) {
    const subject = 'Bienvenue sur notre plateforme';
    const text = `Bonjour ${user.firstName},\n\nMerci pour votre inscription.\n\nÀ bientôt !`;

    await this.mailProvider.sendMail({
      to: user.email,
      subject,
      text,
    });
  }
}

// --- Exemple d'utilisation "prod" avec SendGrid ---
const user = { firstName: 'Kenan', email: 'kenan@example.com' };
const sendGridProvider = new SendGridMailProvider();
const emailService = new EmailService(sendGridProvider);
emailService.sendWelcomeEmail(user);

// --- Exemple (optionnel) d'utilisation en test ---
// const fakeProvider = new FakeMailProvider();
// const testEmailService = new EmailService(fakeProvider);
// testEmailService.sendWelcomeEmail({ firstName: 'Test', email: 'test@example.com' });
// console.log('Emails envoyés (fake) :', fakeProvider.sentEmails);