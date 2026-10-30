import { useId } from "react";
import { useFormikContext, getIn } from "formik";
import type { FormTextareaProps } from "@/types/booking";

function FormTextarea({
  name,
  label,
  id,
  className = "",
  ...props
}: FormTextareaProps) {
  const formik = useFormikContext<Record<string, unknown>>();
  const generatedId = useId();

  // Two booking forms can be mounted at once (header modal + home section), so
  // IDs must be unique per instance for labels to target the right field.
  const textareaId = id ?? `${generatedId}-${name}`;

  const value = getIn(formik.values, name);
  const touched = getIn(formik.touched, name);
  const error = getIn(formik.errors, name);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className="mb-1 block text-sm text-white/70">
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={textareaId}
        name={name}
        value={value ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full resize-y rounded-lg border border-white/10 bg-[#2a2a2a] px-4 py-3 text-white placeholder:text-white/40 focus:border-teal-400 focus:outline-none"
      />
      {touched && error && (
        <p className="mt-1 text-xs text-red-400">{String(error)}</p>
      )}
    </div>
  );
}

export default FormTextarea;
