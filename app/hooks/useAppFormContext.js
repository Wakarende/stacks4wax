import { useFormContext } from "react-hook-form";

export default function useAppFormContext() {
  return useFormContext(); // Removed the <FormValues> type annotation
}
