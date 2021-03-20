import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const placeSelection = (props) => {
    const {value,setValue,inputValue,setInputValue,destinations}=props
    // const [value, setValue] = useState(destinations[0]);
    // const [inputValue, setInputValue] = useState("");
  
  
    return (
        <>
        <Autocomplete
        className="pb-3"
        style={{width: '100%'}}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="from-states-demo"
          options={destinations}
          renderInput={(params) => (
            <TextField {...params} label="From" variant="outlined" />
          )}
        />
        </>
    )
};

export default placeSelection;