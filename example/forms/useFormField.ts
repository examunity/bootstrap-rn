import { FormikContextType, useFormikContext } from 'formik';

interface UseFormFieldReturn {
  error: string | undefined;
  touched: boolean;
  value?: string; // Replace 'any' with a more specific type if needed
  setTouched: () => void;
  setValue: (value: unknown, handleChange?: (e: unknown) => void) => void; // Replace 'any' with a more specific type if needed
}

export default function useFormField(name: string): UseFormFieldReturn {
  const form = useFormikContext<FormikContextType<unknown>>();

  const meta = form.getFieldMeta(name);

  return {
    // values
    error: meta.error,
    touched: meta.touched,
    value: meta.value as string | undefined,
    // functions
    setTouched() {
      form.setFieldTouched(name, true);
    },
    setValue(value, handleChange) {
      if (handleChange) {
        handleChange(value);
      }

      form.setFieldError(name, undefined);

      form.setFieldValue(name, value);
    },
  };
}
