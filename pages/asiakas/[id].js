import * as React from 'react';

import Layout from "../../components/Layout";
import localeText from '../../src/localeText';
import { msFormatter, formatAjankohta, capitalizeFirstLetter } from '../../src/functions';
import { tulevatSarakkeet, menneetSarakkeet } from '../../src/sarakkeet';

import moment from 'moment';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export default function Projekti({ asiakas, menneet_keikat, tulevat_keikat, id }) {
    const [valitutTulevatKeikat, setValitutTulevatKeikat] = React.useState([]);
    const [valitutMenneetKeikat, setValitutMenneetKeikat] = React.useState([]);

    return (
        <Layout title={`${asiakas.space.name} - ${asiakas.name}`} description="Kuvaus" asiakas={id}>
            <Paper sx={{
                height: '100%', width: '100%', maxWidth: 1300, margin: '4rem auto', padding: 2
            }}>
                <h1>Tulevat {asiakas.space.name} - {asiakas.name}</h1>
                <DataGrid
                    rows={tulevat_keikat}
                    columns={tulevatSarakkeet}
                    initialState={{ pagination: { page: 0, pageSize: 10 } }}
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
                        {msFormatter(valitutTulevatKeikat.map(keikka => keikka.time_estimate).reduce((acc, amount) => acc + amount)) + ' h'}
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
                    initialState={{ pagination: { page: 0, pageSize: 10 } }}
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
                        {msFormatter(valitutMenneetKeikat.map(keikka => keikka.time_spent).reduce((acc, amount) => acc + amount)) + ' h — '}
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

    const asiakas_res = await fetch(`https://api.clickup.com/api/v2/list/${atob(id)}`, {
        method: "GET",
        headers: {
            'Authorization': `${process.env.CLICKUP_API_KEY}`,
            'Content-Type': 'application/json'
        },
    });

    const asiakas = await asiakas_res.json();

    const tulevat_keikat_res = await fetch(
        `https://api.clickup.com/api/v2/list/${atob(id)}/task?archived=false&page=0&include_closed=true&due_date_gt=${moment().format('x')}&order_by=due_date&reverse=1`,
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
        `https://api.clickup.com/api/v2/list/${atob(id)}/task?archived=false&page=0&include_closed=true&due_date_lt=${moment().format('x')}&order_by=due_date`,
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
