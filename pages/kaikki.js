import * as React from 'react';

import Layout from "../components/Layout";
import localeText from '../src/localeText';
import { msFormatter } from '../src/functions';
import { tulevatSarakkeetKaikki, menneetSarakkeetKaikki } from '../src/sarakkeet';

import moment from 'moment';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { isNumber } from '@mui/x-data-grid/internals';

export default function Keikat({ menneet_keikat, tulevat_keikat }) {
    const [valitutTulevatKeikat, setValitutTulevatKeikat] = React.useState([]);
    const [valitutMenneetKeikat, setValitutMenneetKeikat] = React.useState([]);

    return (
        <Layout title={`Kaikki keikat`} description="Kuvaus" asiakas={0}>
            <Paper sx={{
                height: '100%', width: '100%', maxWidth: 1500, margin: '4rem auto', padding: 2
            }}>
                <h1>Tulevat keikat</h1>
                <DataGrid
                    rows={tulevat_keikat}
                    columns={tulevatSarakkeetKaikki}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 20 } } }}
                    pageSizeOptions={[10, 20, 50, 100, { value: -1, label: 'Kaikki' }]}
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
                height: '100%', width: '100%', maxWidth: 1500, margin: '4rem auto', padding: 2
            }}>
                <h1>Menneet keikat</h1>
                <DataGrid
                    rows={menneet_keikat}
                    columns={menneetSarakkeetKaikki}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 20 } } }}
                    pageSizeOptions={[10, 20, 50, 100, { value: -1, label: 'Kaikki' }]}
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
    var tulevat_keikat = [];
    var menneet_keikat = [];

    // Tulevat keikat
    for (let i = 0; isNumber(i); i++) {
        let tasks_raw = await fetch(
            `https://api.clickup.com/api/v2/team/${process.env.KEIKAT_TEAM_ID}/task?space_ids[]=${process.env.KEIKAT_SPACE_ID}&archived=false&page=${i}&include_closed=true&due_date_gt=${moment().format('x')}&order_by=due_date&reverse=1`,
            {
                method: "GET",
                headers: {
                    'Authorization': `${process.env.CLICKUP_API_KEY}`,
                    'Content-Type': 'application/json'
                },
            }
        );

        let tasks = await tasks_raw.json();

        if ( tasks.hasOwnProperty("tasks") && tasks.tasks.length > 0 ) {
            tulevat_keikat.push(...tasks.tasks);
        }

        if ( tasks.hasOwnProperty("last_page") && tasks.last_page == true ) {
            break;
        }
    }

    // Menneet keikat
    for (let i = 0; isNumber(i); i++) {
        let tasks_raw = await fetch(
            `https://api.clickup.com/api/v2/team/${process.env.KEIKAT_TEAM_ID}/task?space_ids[]=${process.env.KEIKAT_SPACE_ID}&archived=false&page=${i}&include_closed=true&due_date_lt=${moment().format('x')}&order_by=due_date`,
            {
                method: "GET",
                headers: {
                    'Authorization': `${process.env.CLICKUP_API_KEY}`,
                    'Content-Type': 'application/json'
                },
            }
        );

        let tasks = await tasks_raw.json();

        if ( tasks.hasOwnProperty("tasks") && tasks.tasks.length > 0 ) {
            menneet_keikat.push(...tasks.tasks);
        }

        if ( tasks.hasOwnProperty("last_page") && tasks.last_page == true ) {
            break;
        }
    }

    return { props: { tulevat_keikat, menneet_keikat } };
}
