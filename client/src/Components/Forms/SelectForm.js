import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(() => ({
  formControl: {
    width: "100%",
    marginBottom: 20,
    marginRight: 50,
  },
}));

const SelectForm = ({ title, list, handleChange, value }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      id="combo-box-demo"
      openOnFocus
      options={list}
      getOptionLabel={(item) => item}
      className={classes.formControl}
      renderInput={(params) => (
        <TextField {...params} label={title} variant="outlined" />
      )}
    />
  );
};

/*
const TextBox = ({ title, list, handleChange, value }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        label={title}
      >
        {list.map((item, index) => (
          <MenuItem value={index}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};*/

export default SelectForm;
