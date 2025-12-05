
import ContactForm from "@/components/ui/contact-form";
export default function ContactPage() {
  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
        <p className="text-muted-foreground mb-8">
          Feel free to reach out about projects, collaboration, or questions.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
