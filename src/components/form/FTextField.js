import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          //spread field here to receive input from user
          // required --> never set required because it might get mixup with yup
          error={!!error}
          helperText={error?.message}
          // {...field}
          {...other}
          //--> {...others} are styling props
        />
      )}
    />
  );
}
export default FTextField;
