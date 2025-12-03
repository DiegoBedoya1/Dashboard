import {useState, useEffect} from "react";
import { type OpenMeteoResponse } from '../types/DashboardTypes';


export default function useFetchData() : OpenMeteoResponse { 
    const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago";
    const [data,setData] = useState<OpenMeteoResponse>();
    useEffect( () => {
       fetch(url)
       .then(response => response.json())
       .then(data => setData(data))
    },[]);
    return data!;
}
