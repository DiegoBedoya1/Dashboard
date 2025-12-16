import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type {proceData} from '../functions/useFetchData';



export default function ChartUI(dato: proceData) {
    
   return (
    <>
        {dato.isLoading && <p>data cargando</p>}
        {dato.error && <p>{dato.error}</p>}
        {dato.data && (
               <>
                   <Typography variant="h5" component="div">
                       Chart arrLabels vs Temperature & WindSpeed
                   </Typography>
                   <LineChart
                       height={300}
                       series={[
                           { data: dato.data.hourly.temperature_2m, label: 'value1' },
                           { data: dato.data.hourly.wind_speed_10m, label: 'value2' },
                       ]}
                       xAxis={[{ scaleType: 'point', data: dato.data.hourly.time }]}
                   />
               </>
        )}
    </>
      
   );
}