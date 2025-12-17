import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type {proceData} from '../functions/useFetchData';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Hora',
      width: 125,
   },
   {
      field: 'value1',
      headerName: 'Temperature (°C)',
      width: 125,
   },
   {
      field: 'value2',
      headerName: 'Viento (km/h)',
      width: 125,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 100,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
];

const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const arrLabels = ['A','B','C','D','E','F','G'];

export default function TableUI(proce:proceData) {

   let rows;

   if (proce.data?.hourly) {
      const data = proce.data;
      rows = data.hourly.time.map((time, index) => ({
         id: index,
         label: time.split('T')[1].substring(0, 5),
         value1: data.hourly.temperature_2m[index],
         value2: data.hourly.wind_speed_10m[index]
      })).slice(0, 7);
   } else {
      rows = combineArrays(arrLabels, arrValues1, arrValues2);
   }

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}