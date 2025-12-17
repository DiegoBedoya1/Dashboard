import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type {proceData} from '../functions/useFetchData';



export default function ChartUI(dato: proceData) {
    
   return (
    <>
        {dato.loading && <p>data cargando...</p>}
        {dato.error && <p>{dato.error}</p>}
        {dato.data && (
               <>
                   <Typography variant="h5" component="div">
                        Hora vs Temperatura (°C) & Viento (km/h)
                   </Typography>
                   <LineChart
                       height={300}
                       series={[
                           { data: dato.data.hourly.temperature_2m, label: 'Temperatura (°C)' },
                           { data: dato.data.hourly.wind_speed_10m, label: 'Viento (km/h)' },
                       ]}
                       xAxis={[{ scaleType: 'point', data: dato.data.hourly.time }]}
                   />
               </>
        )}
    </>
      
   );
}