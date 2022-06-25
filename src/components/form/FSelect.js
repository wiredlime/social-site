import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FSelect({ name, children, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          // color="secondary"
          required
          // id="email"
          // label="Email"
          // type="text"
          // size="small"
          select
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...field}
          {...other}
          //--> {...others} are styling props
        >
          {children}
        </TextField>
      )}
    />
  );
}
export default FSelect;
