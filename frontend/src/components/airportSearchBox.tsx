import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Airport } from '../types';



const AirportSearchBox = (props: {
      is_origin: Boolean
      airports: Airport[]
      setValue: Function
      value: string
    }) => {

  return (
    <Autocomplete
      disablePortal
      id={props.is_origin ? "origin-search" : "destination-search"}
      value={props.value}
      onChange={(event: any, newValue: string | null) => {
        props.setValue(newValue);
      }}
      options={props.airports.map((option) => `(${option.abbv}) ${option.name}`)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={props.is_origin ? "Origin" : "Destination"} />}
    />
  );
}

export default AirportSearchBox