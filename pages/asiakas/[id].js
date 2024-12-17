import * as React from 'react';

import Layout from "../../components/Layout";

import moment from 'moment';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const localeText = {
    // Root
    noRowsLabel: 'Ei rivejä',
    noResultsOverlayLabel: 'Ei tuloksia.',

    // Density selector toolbar button text
    toolbarDensity: 'Tiiveys',
    toolbarDensityLabel: 'Tiiveys',
    toolbarDensityCompact: 'Kompakti',
    toolbarDensityStandard: 'Vakio',
    toolbarDensityComfortable: 'Mukava',

    // Columns selector toolbar button text
    toolbarColumns: 'Sarakkeet',
    toolbarColumnsLabel: 'Valitse sarakkeet',

    // Filters toolbar button text
    toolbarFilters: 'Suodattimet',
    toolbarFiltersLabel: 'Näytä suodattimet',
    toolbarFiltersTooltipHide: 'Piilota suodattimet',
    toolbarFiltersTooltipShow: 'Näytä suodattimet',
    toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} aktiivista suodatinta` : `${count} aktiivinen suodatin`,

    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Hae…',
    toolbarQuickFilterLabel: 'Hae',
    toolbarQuickFilterDeleteIconLabel: 'Tyhjennä',

    // Export selector toolbar button text
    toolbarExport: 'Vie',
    toolbarExportLabel: 'Vie',
    toolbarExportCSV: 'Lataa CSV-muodossa',
    toolbarExportPrint: 'Tulosta',
    toolbarExportExcel: 'Lataa Excel-muodossa',

    // Columns management text
    columnsManagementSearchTitle: 'Hae',
    columnsManagementNoColumns: 'Ei sarakkeita näytettäväksi',
    columnsManagementShowHideAllText: 'Näytä/Piilota kaikki',
    columnsManagementReset: 'Palauta',
    columnsManagementDeleteIconLabel: 'Tyhjennä',

    // Filter panel text
    filterPanelAddFilter: 'Lisää suodatin',
    filterPanelRemoveAll: 'Poista kaikki',
    filterPanelDeleteIconLabel: 'Poista',
    filterPanelLogicOperator: 'Logiikkaoperaattori',
    filterPanelOperator: 'Operaattorit',
    filterPanelOperatorAnd: 'Ja',
    filterPanelOperatorOr: 'Tai',
    filterPanelColumns: 'Sarakkeet',
    filterPanelInputLabel: 'Arvo',
    filterPanelInputPlaceholder: 'Suodattimen arvo',

    // Filter operators text
    filterOperatorContains: 'sisältää',
    filterOperatorDoesNotContain: 'ei sisällä',
    filterOperatorEquals: 'on yhtä suuri kuin',
    filterOperatorDoesNotEqual: 'ei ole yhtä suuri kuin',
    filterOperatorStartsWith: 'alkaa',
    filterOperatorEndsWith: 'päättyy',
    filterOperatorIs: 'on',
    filterOperatorNot: 'ei ole',
    filterOperatorAfter: 'on jälkeen',
    filterOperatorOnOrAfter: 'on sama tai jälkeen',
    filterOperatorBefore: 'on ennen',
    filterOperatorOnOrBefore: 'on sama tai ennen',
    filterOperatorIsEmpty: 'on tyhjä',
    filterOperatorIsNotEmpty: 'ei ole tyhjä',
    filterOperatorIsAnyOf: 'on mikä tahansa seuraavista',
    'filterOperator=': '=',
    'filterOperator!=': '!=',
    'filterOperator>': '>',
    'filterOperator>=': '>=',
    'filterOperator<': '<',
    'filterOperator<=': '<=',

    // Header filter operators text
    headerFilterOperatorContains: 'Sisältää',
    headerFilterOperatorDoesNotContain: 'Ei sisällä',
    headerFilterOperatorEquals: 'On yhtä suuri kuin',
    headerFilterOperatorDoesNotEqual: 'Ei ole yhtä suuri kuin',
    headerFilterOperatorStartsWith: 'Alkaa',
    headerFilterOperatorEndsWith: 'Päättyy',
    headerFilterOperatorIs: 'On',
    headerFilterOperatorNot: 'Ei ole',
    headerFilterOperatorAfter: 'On jälkeen',
    headerFilterOperatorOnOrAfter: 'On sama tai jälkeen',
    headerFilterOperatorBefore: 'On ennen',
    headerFilterOperatorOnOrBefore: 'On sama tai ennen',
    headerFilterOperatorIsEmpty: 'On tyhjä',
    headerFilterOperatorIsNotEmpty: 'Ei ole tyhjä',
    headerFilterOperatorIsAnyOf: 'On mikä tahansa seuraavista',
    'headerFilterOperator=': 'On yhtä suuri kuin',
    'headerFilterOperator!=': 'Ei ole yhtä suuri kuin',
    'headerFilterOperator>': 'Enemmän kuin',
    'headerFilterOperator>=': 'Enemmän tai yhtä paljon kuin',
    'headerFilterOperator<': 'Vähemmän kuin',
    'headerFilterOperator<=': 'Vähemmän tai yhtä paljon kuin',

    // Filter values text
    filterValueAny: 'mikä tahansa',
    filterValueTrue: 'tosi',
    filterValueFalse: 'epätosi',

    // Column menu text
    columnMenuLabel: 'Valikko',
    columnMenuShowColumns: 'Näytä sarakkeet',
    columnMenuManageColumns: 'Hallitse sarakkeita',
    columnMenuFilter: 'Suodata',
    columnMenuHideColumn: 'Piilota',
    columnMenuUnsort: 'Poista järjestys',
    columnMenuSortAsc: 'Järjestä nousevasti',
    columnMenuSortDesc: 'Järjestä laskevasti',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} aktiivista suodatinta` : `${count} aktiivinen suodatin`,
    columnHeaderFiltersLabel: 'Näytä suodattimet',
    columnHeaderSortIconLabel: 'Järjestä',

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} riviä valittu`
            : `${count.toLocaleString()} rivi valittu`,

    // Total row amount footer text
    footerTotalRows: 'Rivejä yhteensä:',

    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount} / ${totalCount}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: 'Valintaruutu',
    checkboxSelectionSelectAllRows: 'Valitse kaikki rivit',
    checkboxSelectionUnselectAllRows: 'Poista kaikkien rivien valinta',
    checkboxSelectionSelectRow: 'Valitse rivi',
    checkboxSelectionUnselectRow: 'Poista rivin valinta',

    // Boolean cell text
    booleanCellTrueLabel: 'tosi',
    booleanCellFalseLabel: 'epätosi',

    // Actions cell more text
    actionsCellMore: 'lisää',

    // Column pinning text
    pinToLeft: 'Kiinnitä vasemmalle',
    pinToRight: 'Kiinnitä oikealle',
    unpin: 'Irrota kiinnitys',

    // Tree Data
    treeDataGroupingHeaderName: 'Ryhmä',
    treeDataExpand: 'Laajenna',
    treeDataCollapse: 'Supista',

    // Grouping columns
    groupingColumnHeaderName: 'Ryhmä',
    groupColumn: (name) => `Ryhmittelyperuste ${name}`,
    unGroupColumn: (name) => `Poista ryhmittelyperuste ${name}`,

    // Master/detail
    detailPanelToggle: 'Yksityiskohtapaneelin vaihto',
    expandDetailPanel: 'Laajenna',
    collapseDetailPanel: 'Tiivistä',

    // Row reordering text
    rowReorderingHeaderName: 'Rivien uudelleenjärjestely',

    // Aggregation
    aggregationMenuItemHeader: 'Koostaminen',
    aggregationFunctionLabelSum: 'summa',
    aggregationFunctionLabelAvg: 'ka.',
    aggregationFunctionLabelMin: 'min.',
    aggregationFunctionLabelMax: 'maks.',
    aggregationFunctionLabelSize: 'koko',
}

function msFormatter(ms) {
    if (!ms) return '0 h';
    let hours = String(Math.ceil((ms / (1000 * 60 * 60)) * 4) / 4).replace('0', '').replace('.25', '¼').replace('.5', '½').replace('.75', '¾');
    return hours + " h";
}

function formatAjankohta(start_date, due_date) {
    if (start_date === due_date) {
        return moment(start_date, "x").format('D.M.YYYY');
    } else {
        return moment(start_date, "x").format('D.') + '–' + moment(due_date, "x").format('D.M.YYYY');
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function Projekti({ asiakas, menneet_keikat, tulevat_keikat, id }) {
    const [valitutTulevatKeikat, setValitutTulevatKeikat] = React.useState([]);
    const [valitutMenneetKeikat, setValitutMenneetKeikat] = React.useState([]);

    const tulevatSarakkeet = [
        { field: 'name', headerName: 'Nimi', minWidth: 300 },
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
            valueGetter: (value, task) => (task.time_estimate > 0) ? msFormatter(task.time_estimate) : '',
        },
    ];

    const menneetSarakkeet = [
        { field: 'name', headerName: 'Nimi', minWidth: 200 },
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
            valueGetter: (value, task) => (task.time_spent > 0) ? msFormatter(task.time_spent) : '',
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

    const paginationModel = { page: 0, pageSize: 10 };

    return (
        <Layout title={`${asiakas.space.name} - ${asiakas.name}`} description="Kuvaus" asiakas={id}>
            <Paper sx={{
                height: '100%', width: '100%', maxWidth: 1300, margin: '4rem auto', padding: 2
            }}>
                <h1>Tulevat {asiakas.space.name} - {asiakas.name}</h1>
                <DataGrid
                    rows={tulevat_keikat}
                    columns={tulevatSarakkeet}
                    initialState={{ pagination: { paginationModel } }}
                    checkboxSelection
                    sx={{ border: 0 }}
                    autosizeOptions={{
                        columns: ['name', 'status', 'venue'],
                        includeOutliers: true,
                        includeHeaders: true,
                    }}
                    autosizeOnMount={true}
                    slots={{ toolbar: GridToolbar }}
                    localeText={localeText}
                    onRowSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = tulevat_keikat.filter((row) =>
                          selectedIDs.has(row.id)
                        );
                        setValitutTulevatKeikat(selectedRows);
                    }}
                />
                {(valitutTulevatKeikat.length > 0) &&
                    <Typography sx={{ mt: 2 }}>
                        <b>Valitut tulevat keikat:</b> työaika-arvio {' '}
                        {msFormatter(valitutTulevatKeikat.map(keikka => keikka.time_estimate).reduce((acc, amount) => acc + amount))}
                    </Typography>
                }
            </Paper>

            <Paper sx={{
                height: '100%', width: '100%', maxWidth: 1300, margin: '4rem auto', padding: 2
            }}>
                <h1>Menneet {asiakas.space.name} - {asiakas.name}</h1>
                <DataGrid
                    rows={menneet_keikat}
                    columns={menneetSarakkeet}
                    initialState={{ pagination: { paginationModel } }}
                    checkboxSelection
                    sx={{ border: 0 }}
                    autosizeOptions={{
                        columns: ['name', 'status', 'venue'],
                        includeOutliers: true,
                        includeHeaders: true,
                    }}
                    autosizeOnMount={true}
                    slots={{ toolbar: GridToolbar }}
                    localeText={localeText}
                    onRowSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = menneet_keikat.filter((row) =>
                          selectedIDs.has(row.id)
                        );
                        setValitutMenneetKeikat(selectedRows);
                    }}
                />
                {(valitutMenneetKeikat.length > 0) &&
                    <Typography sx={{ mt: 2 }}>
                        <b>Valitut menneet keikat:</b> {' '}
                        {msFormatter(valitutMenneetKeikat.map(keikka => keikka.time_spent).reduce((acc, amount) => acc + amount)) + ' — '}
                        {valitutMenneetKeikat.map( keikka => Number(keikka.custom_fields[keikka.custom_fields.findIndex((field) => field.name === 'Hinta')].value) ).reduce( (acc, amount) => acc + amount ) + ' € + ALV'}
                    </Typography>
                }
            </Paper>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    var tulevat_keikat = [];
    var menneet_keikat = [];

    const asiakas_res = await fetch(`https://api.clickup.com/api/v2/list/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `${process.env.CLICKUP_API_KEY}`,
            'Content-Type': 'application/json'
        },
    });

    const asiakas = await asiakas_res.json();

    const tulevat_keikat_res = await fetch(
        `https://api.clickup.com/api/v2/list/${id}/task?archived=false&page=0&include_closed=true&due_date_gt=${moment().format('x')}&order_by=due_date&reverse=1`,
        {
            method: "GET",
            headers: {
                'Authorization': `${process.env.CLICKUP_API_KEY}`,
                'Content-Type': 'application/json'
            },
        }
    );

    const tulevat_keikat_json = await tulevat_keikat_res.json();

    if (tulevat_keikat_json.hasOwnProperty("tasks") && tulevat_keikat_json.tasks.length > 0) {
        tulevat_keikat = tulevat_keikat_json.tasks;
    }

    const menneet_keikat_res = await fetch(
        `https://api.clickup.com/api/v2/list/${id}/task?archived=false&page=0&include_closed=true&due_date_lt=${moment().format('x')}&order_by=due_date`,
        {
            method: "GET",
            headers: {
                'Authorization': `${process.env.CLICKUP_API_KEY}`,
                'Content-Type': 'application/json'
            },
        }
    );

    const menneet_keikat_json = await menneet_keikat_res.json();

    if (menneet_keikat_json.hasOwnProperty("tasks") && menneet_keikat_json.tasks.length > 0) {
        menneet_keikat = menneet_keikat_json.tasks;
    }

    return { props: { asiakas, tulevat_keikat, menneet_keikat, id } };
}
