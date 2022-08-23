export interface Dictionary<T> {
  [index: string]: T;
}

export type Airport = {
    id: number
    name: string
    abbv: string
    combined: string
  }
  
export type Flight = {
  created_at: Date
  updated_at: Date
  flight_identifier: string
  flt_num: number
  scheduled_origin_gate: string
  scheduled_destination_gate: string
  out_gmt: Date
  in_gmt: Date
  off_gmt: Date
  on_gmt: Date
  destination_id: Number
  destination: Airport
  origin_id: Number
  origin: Airport
}