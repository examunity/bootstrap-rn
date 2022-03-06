import { useFormikContext } from 'formik';

export default function useFormField(name) {
  const form = useFormikContext();

  const meta = form.getFieldMeta(name);

  return {
    // values
    error: meta.error,
    touched: meta.touched,
    value: meta.value,
    // functions
    setTouched() {
      form.setFieldTouched(name, true);
    },
    setValue(value, handleChange) {
      if (handleChange) {
        handleChange(value);
      }

      form.setFieldError(name, null);

      form.setFieldValue(name, value);
    },
  };
}
