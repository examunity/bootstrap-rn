import { FormikContextType, useFormikContext } from 'formik';

export default function useFormField<T>(name: string) {
  const form = useFormikContext<FormikContextType<unknown>>();

  const meta = form.getFieldMeta<T>(name);

  return {
    // values
    error: meta.error,
    touched: meta.touched,
    value: meta.value,
    // functions
    setTouched() {
      form.setFieldTouched(name, true);
    },
    setValue(value: unknown, handleChange?: (e: unknown) => void) {
      if (handleChange) {
        handleChange(value);
      }

      form.setFieldError(name, undefined);

      form.setFieldValue(name, value);
    },
  };
}
