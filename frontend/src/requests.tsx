import axios from 'axios';
import {Airport} from "./types";

axios.defaults.baseURL = process.env.BACKEND_URL ?? "http://localhost:8000"

const airportRestPath = "/airports/"
const flightRestPath = "/flights/"

/** Query the Airports API using Axios with specific search parameters. */
export const getAirports = async() => {
  return await axios.get(airportRestPath)
}

/** Query the Airports API using Axios with specific search parameters. */
export const getFlightsQuery = async(origin: string, destination: string, airports: Airport[]) => {
  if (airports.length == 0) {
    return null
  }
  else {
    try {
      var params = new URLSearchParams();
      if (origin != null){
        const origin_abbv = origin.split(")", 1)[0].replace("(", "")
        const origin_id = airports.find((obj) => {return obj.abbv === origin_abbv})
        if (origin_id != null) {
          params.append('origin_id', origin_id.id.toString());
        }
      }
      if (destination != null){
        const destination_abbv = destination.split(")", 1)[0].replace("(", "")
        const destination_id = airports.find((obj) => {return obj.abbv === destination_abbv})
        if (destination_id != null) {
          params.append('destination_id', destination_id.id.toString());
        }
      }
      return await axios.get(flightRestPath,{
        params
      })
    } catch (error) {
      console.error(error);
    }
  }
}