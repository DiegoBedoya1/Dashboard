import {useState, useEffect} from "react";
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export interface proceData{
    data: OpenMeteoResponse | null,
    loading: boolean,
    error: string | null

}


export default function useFetchData(selectedOption: string | null) { 
    //const url = "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature";
     const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
        'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
        'Quito': {latitude:-0.2298, longitude:-78.525},
        'Cuenca': {latitude:-2.9005 , longitude:-79.0045},
        'Manta': {latitude:-0.9494, longitude:-80.7314},
     };
    const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
    const [data,setData] = useState<OpenMeteoResponse | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect( () => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature`;
        const fetchData = async () => {
        try{
            const respuesta = await fetch(url);
            setLoading(false);
            setError(null);
            const resultado = await respuesta.json();
            setData(resultado);
        }catch(err){
            setError(err instanceof Error ? err.message: 'Error');
        }finally {
            setLoading(false);
        }
       };
       fetchData();
},[selectedOption]);
    return { data, loading, error};
}
