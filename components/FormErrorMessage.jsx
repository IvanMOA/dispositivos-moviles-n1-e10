import { FormControl, WarningOutlineIcon } from "native-base";
import React from "react";

export default function FormErrorMessage({ errorBag, name }) {
  if (!errorBag[name]) return null;
  return (
    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
      {errorBag[name].join(". ")}
    </FormControl.ErrorMessage>
  );
}
