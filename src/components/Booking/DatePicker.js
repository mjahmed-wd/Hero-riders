import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const StaticDatePicker = (props) => {
  const { selectedDate, handleDateChange } = props;
  return (
    <div className="pb-3">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
         style={{ width: "100%" }}
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="Pick Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          minDate={new Date()}
          InputAdornmentProps={{ position: "start" }}
          onChange={(date) => handleDateChange(date)}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default StaticDatePicker;
