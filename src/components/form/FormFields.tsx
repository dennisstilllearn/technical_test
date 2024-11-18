import React from "react";
import { FormFieldProps } from "@/components/form/types";
import { TextField } from "@/components/form/fields/TextField";
import { FormLabel } from "@/components/form/FormLabel";
import { PasswordField } from "./fields/PasswordField";

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ field, path, value, errors, updateModelValue, ...props }, ref) => {
    const generateField = () => {
      let Component = null;

      switch (field.type) {
        case "text":
          Component = TextField;
          break;
        //menambahkan case untuk component PasswordField.
        case "password":
          Component = PasswordField;
          break;
        default:
          return <></>;
      }

      return (
        <FormLabel label={field.label} errors={errors} path={path}>
          <Component
            field={field}
            // @ts-ignore
            value={value}
            path={path}
            updateModelValue={updateModelValue}
          />
        </FormLabel>
      );
    };
    return generateField();
  }
);

FormField.displayName = "FormField";

export { FormField };
