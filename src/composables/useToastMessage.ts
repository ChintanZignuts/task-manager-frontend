// composables/useToastMessage.ts
import { useToast } from "primevue/usetoast";

export function useToastMessage() {
  const toast = useToast();

  const showToast = (
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string
  ) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 3000, // Duration in milliseconds
    });
  };

  return { showToast };
}
