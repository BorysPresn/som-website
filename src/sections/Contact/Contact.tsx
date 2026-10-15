import { ContactForm } from "./ContactForm";
import { ContactLayout } from "./ContactLayout";
import { ContactMethods } from "./ContactMethods";

export const Contact = () => (
  <ContactLayout>
    <ContactForm />
    <ContactMethods />
  </ContactLayout>
);
