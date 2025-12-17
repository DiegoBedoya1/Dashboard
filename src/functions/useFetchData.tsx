import { useState, useEffect } from "react";
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export interface proceData {
    data: OpenMeteoResponse | null,
    loading: boolean,
    error: string | null
}

export default function useFetchData(selectedOption: string | null) {
    
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Definimos las coordenadas dentro para evitar dependencias externas
        const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
            'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
            'Quito': { latitude: -0.2298, longitude: -78.525 },
            'Cuenca': { latitude: -2.9005, longitude: -79.0045 },
            'Manta': { latitude: -0.9494, longitude: -80.7314 },
        };

        // --- BLOQUE DE SEGURIDAD ---
        // 1. Imprimimos qué está llegando para depurar (mira la consola del navegador con F12)
        console.log("Ciudad seleccionada:", selectedOption);

        // 2. Buscamos la configuración. 
        // Si selectedOption es null, undefined o no existe en la lista, forzamos 'Guayaquil'
        let cityConfig = CITY_COORDS[selectedOption || 'Guayaquil'];

        // 3. Si por alguna razón extrema sigue siendo undefined (ej. selectedOption era una cadena rara),
        // forzamos manualmente las coordenadas de Guayaquil para evitar el crash.
        if (!cityConfig) {
            console.warn(`La ciudad '${selectedOption}' no fue encontrada. Usando Guayaquil por defecto.`);
            cityConfig = CITY_COORDS['Guayaquil'];
        }
        // ---------------------------

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature`;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const respuesta = await fetch(url);

                if (!respuesta.ok) {
                    throw new Error(`Error de red: ${respuesta.statusText}`);
                }

                const resultado = await respuesta.json();
                setData(resultado);
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [selectedOption]);

    return { data, loading, error };
}