import React, { useEffect } from "react";
import { TextFieldProps } from "@/components/form/types";
import { Input } from "@/components/ui/input";

const TextField = React.memo(
  React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ field, value, path, updateModelValue, ...props }, ref) => {
      useEffect(() => {
        console.log(`TextField ${path} mounted`);
        return () => {
          console.log(`TextField ${path} unmounted`);
        };
      }, []);

      useEffect(() => {
        console.log(`TextField ${path} rerendered`);
      });

      return (
        <Input
          ref={ref}
          name={field.name}
          id={path}
          // @ts-ignore
          value={value}
          onChange={(e) => updateModelValue(path, field, e.target.value)}
          {...props}
        />
      );
    }
  ),
  (prevProps, nextProps) => {
    // saya membuat comparison logic untuk menemukan perbedaan antara props sebelumnya dan props saat ini
    return (
      prevProps.value === nextProps.value &&
      prevProps.field.name === nextProps.field.name &&
      prevProps.path === nextProps.path
    );
  }
);

TextField.displayName = "TextField";
export { TextField };
