// components/FormInput.tsx
import { useFormikContext, getIn } from "formik"
import type { FormInputProps } from "@/types/booking";

function FormInput({ name, label, className = "", ...props }: FormInputProps) {
  const formik = useFormikContext<Record<string, unknown>>();

  const value = getIn(formik.values, name);
  const touched = getIn(formik.touched, name);
  const error = getIn(formik.errors, name);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="mb-1 block text-sm text-white/70">
          {label}
        </label>
      )}
      <input
        {...props}
        id={name}
        name={name}
        value={value ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full rounded-lg border border-white/10 bg-[#2a2a2a] px-4 py-3 text-white placeholder:text-white/40 focus:border-teal-400 focus:outline-none"
      />
      {touched && error && (
        <p className="mt-1 text-xs text-red-400">{String(error)}</p>
      )}
    </div>
  );
}

export default FormInput;
