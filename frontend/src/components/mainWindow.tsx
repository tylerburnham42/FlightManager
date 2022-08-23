import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';


import AirportSearchBox from './airportSearchBox'
import HeaderAppBar from './headerAppBar';

import {getAirports, getFlightsQuery} from "../requests";
import {Airport, Flight} from "../types"



const MainWindow = (props: {

}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  

  /** Query the Airports API and save it to the airports list state. */
  const fetchAirports = async() => {
      return getAirports().then(res => {
        setAirports(res.data)
      })
    }

  /** Query the Flights API and save it to the airports list state. */
  const fetchFlights = async() => {
    return getFlightsQuery(origin, destination, airports).then(res => {
      if (res != null) {
        setFlights(res.data)
      }
    })
  }

  /** Handle the pagination for the main table. */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /** Handle the pagination for the main table. */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /** Query the airports on load so the search boxes have autocomplete data. */
  useEffect(() => {
    fetchAirports()
  }, [])

  return (
    <Stack spacing={1}>
      <HeaderAppBar></HeaderAppBar>
      <Stack spacing={1} direction="row">
      <AirportSearchBox is_origin={true} airports={airports} value={origin} setValue={setOrigin}></AirportSearchBox>
      <AirportSearchBox is_origin={false} airports={airports} value={destination} setValue={setDestination}></AirportSearchBox>
      <Button variant="contained" onClick={fetchFlights}>Search</Button>
      </Stack>
      <Card elevation={3} style={{padding: 10}} color="secondary" >
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Flight Number</TableCell>
                <TableCell>Flight Identifier</TableCell>
                <TableCell>Scheduled Origin Gate</TableCell>
                <TableCell>Scheduled Destination Gate</TableCell>
                <TableCell>Out Time</TableCell>
                <TableCell>In Time</TableCell>
                  

                </TableRow>
              </TableHead>
              <TableBody>
                {flights.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow
                    key={row.flt_num}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.origin.name}</TableCell>
                    <TableCell>{row.destination.name}</TableCell>
                    <TableCell>{row.flt_num}</TableCell>
                    <TableCell>{row.flight_identifier}</TableCell>
                    <TableCell>{row.scheduled_origin_gate}</TableCell>
                    <TableCell>{row.scheduled_destination_gate}</TableCell>
                    <TableCell>{row.out_gmt.toString()}</TableCell>
                    <TableCell>{row.in_gmt.toString()}</TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={flights.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Card>
    </Stack>
  );

}

export default MainWindow