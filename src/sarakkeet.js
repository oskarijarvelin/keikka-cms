import moment from 'moment';
import { msFormatter, formatAjankohta, capitalizeFirstLetter } from './functions';

export const tulevatSarakkeetKaikki = [
    { field: 'name', headerName: 'Nimi', minWidth: 250 },
    {
        field: 'ajankohta',
        headerName: 'Ajankohta',
        minWidth: 150,
        sortable: false,
        valueGetter: (value, task) => formatAjankohta(task.start_date, task.due_date),
    },
    {
        field: 'venue', headerName: 'Venue', minWidth: 200,
        valueGetter: (value, task) => task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Venue')].type_config.options[task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Venue')].value].name,
    },
    {
        field: 'asiakas', headerName: 'Asiakas', minWidth: 200,
        valueGetter: (value, task) => task.list.name,
    },
    {
        field: 'status', headerName: 'Status', minWidth: 150,
        valueGetter: (value, task) => capitalizeFirstLetter(task.status.status.replace(/^[0-9]/, "").replace(" - ", "")),
    },
    {
        field: 'time_estimate', headerName: 'Työaika-arvio', minWidth: 120,
        valueGetter: (value, task) => (task.time_estimate > 0) ? msFormatter(task.time_estimate) + ' h' : '',
    },
];

export const menneetSarakkeetKaikki = [
    { field: 'name', headerName: 'Nimi', minWidth: 250 },
    {
        field: 'ajankohta',
        headerName: 'Ajankohta',
        minWidth: 130,
        sortable: false,
        valueGetter: (value, task) => formatAjankohta(task.start_date, task.due_date),
    },
    {
        field: 'venue', headerName: 'Venue', minWidth: 200,
        valueGetter: (value, task) => task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Venue')].type_config.options[task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Venue')].value].name,
    },
    {
        field: 'asiakas', headerName: 'Asiakas', minWidth: 200,
        valueGetter: (value, task) => task.list.name,
    },
    {
        field: 'status', headerName: 'Status', minWidth: 150,
        valueGetter: (value, task) => capitalizeFirstLetter(task.status.status.replace(/^[0-9]/, "").replace(" - ", "")),
    },
    {
        field: 'time_spent', headerName: 'Työtunnit', minWidth: 50,
        valueGetter: (value, task) => (task.time_spent > 0) ? msFormatter(task.time_spent) + ' h' : '',
    },
    {
        field: 'value', headerName: 'Laskutusarvo', minWidth: 140,
        valueGetter: (value, task) => (task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Hinta')].value) ? (task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Hinta')].value + ' € + ALV') : '',
    },
    {
        field: 'laskutettu', headerName: 'Laskutettu', minWidth: 140, sortable: false,
        valueGetter: (value, task) => (task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Laskutus PVM')].value) ? (moment(task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Laskutus PVM')].value, "x").format('D.M.YYYY')) : 'Ei vielä',
    },
];

export const tulevatSarakkeet = [
    { field: 'name', headerName: 'Nimi', minWidth: 250 },
    {
        field: 'ajankohta',
        headerName: 'Ajankohta',
        minWidth: 150,
        sortable: false,
        valueGetter: (value, task) => formatAjankohta(task.start_date, task.due_date),
    },
    {
        field: 'venue', headerName: 'Venue', minWidth: 200,
        valueGetter: (value, task) => task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Venue')].type_config.options[task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Venue')].value].name,
    },
    {
        field: 'status', headerName: 'Status', minWidth: 150,
        valueGetter: (value, task) => capitalizeFirstLetter(task.status.status.replace(/^[0-9]/, "").replace(" - ", "")),
    },
    {
        field: 'time_estimate', headerName: 'Työaika-arvio', minWidth: 120,
        valueGetter: (value, task) => (task.time_estimate > 0) ? msFormatter(task.time_estimate) + ' h' : '',
    },
];

export const menneetSarakkeet = [
    { field: 'name', headerName: 'Nimi', minWidth: 250 },
    {
        field: 'ajankohta',
        headerName: 'Ajankohta',
        minWidth: 130,
        sortable: false,
        valueGetter: (value, task) => formatAjankohta(task.start_date, task.due_date),
    },
    {
        field: 'venue', headerName: 'Venue', minWidth: 200,
        valueGetter: (value, task) => task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Venue')].type_config.options[task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Venue')].value].name,
    },
    {
        field: 'status', headerName: 'Status', minWidth: 150,
        valueGetter: (value, task) => capitalizeFirstLetter(task.status.status.replace(/^[0-9]/, "").replace(" - ", "")),
    },
    {
        field: 'time_spent', headerName: 'Toteutunut työaika', minWidth: 150,
        valueGetter: (value, task) => (task.time_spent > 0) ? msFormatter(task.time_spent) + ' h' : '',
    },
    {
        field: 'value', headerName: 'Laskutusarvo', minWidth: 140,
        valueGetter: (value, task) => (task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Hinta')].value) ? (task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Hinta')].value + ' € + ALV') : '',
    },
    {
        field: 'laskutettu', headerName: 'Laskutettu', minWidth: 140, sortable: false,
        valueGetter: (value, task) => (task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Laskutus PVM')].value) ? (moment(task.custom_fields[task.custom_fields.findIndex((field) => field.name === 'Laskutus PVM')].value, "x").format('D.M.YYYY')) : 'Ei vielä',
    },
];

export default { tulevatSarakkeetKaikki, menneetSarakkeetKaikki };
