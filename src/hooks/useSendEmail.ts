import { useState } from "react";
import emailjs from "@emailjs/browser";

interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

interface UseSendEmailReturn {
  isSubmitting: boolean;
  isSent: boolean;
  error: string | null;
  sendEmail: (data: EmailFormData) => Promise<void>;
  reset: () => void;
}

export const useSendEmail = (): UseSendEmailReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (data: EmailFormData): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setIsSent(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send email";
      setError(errorMessage);
      console.error("Failed to send email:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSent(false);
    setError(null);
    setIsSubmitting(false);
  };

  return {
    isSubmitting,
    isSent,
    error,
    sendEmail,
    reset,
  };
};
