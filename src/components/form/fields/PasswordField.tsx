// TODO: Challenge #3 - create a password field component

import { TextFieldProps } from "@/components/form/types";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import React from "react";

const PasswordField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ field, value, path, updateModelValue, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          name={field.name}
          id={path}
          // @ts-ignore
          value={value}
          type={showPassword ? "text" : field.type}
          onChange={(e) => updateModelValue(path, field, e.target.value)}
        />

        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-0 bottom-0 my-auto"
          type="button"
        >
          {showPassword ? (
            <EyeIcon className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>
      </div>
    );
  }
);

PasswordField.displayName = "TextField";
export { PasswordField };
