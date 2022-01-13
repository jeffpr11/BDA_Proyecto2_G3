const { Spanner } = require('@google-cloud/spanner');

const config = {
    project_id: 'fair-bearing-332523',
    instancia_id: 'aerolineadba',
    database_id: 'basesavanzadasaerolineas',
}

const getColumns = (table) => {
    var r = {
        'passenger' : ['passid', 'passname', 'passemail', 'passdob', 'shardid'],
        'bookingdetails' : ['bookingid', 'passid'],
        'booking' : ['bookingid', 'flightid', 'bookdate', 'shardid'],
        'flight' : ['flightid', 'flightsource', 'flightdest', 'flightdete', 'flightseat', 'ticketcost']
    }
    return r[table];
};

/* CREATE */
async function insertData(instanceId, databaseId, projectId, tableName, json) {
    const spanner = new Spanner({
        projectId: projectId,
    });
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    const tableN = database.table(tableName);

    try {
        await tableN.insert(json);
        console.log('Inserted data.');
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await database.close();
    }
}

/* READ */
async function readData(instanceId, databaseId, projectId, tableName) {
    const spanner = new Spanner({
        projectId: projectId,
    });
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    const tableN = database.table(tableName);

    const query = { 
        columns: getColumns(tableName),
        keySet: {
            all: true,
        },
    };

    try {
        const [rows] = await tableN.read(query);
        rows.forEach(row => {
            const json = row.toJSON();
            console.log(json);
        });
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await database.close();
    }
}

async function queryData(instanceId, databaseId, projectId, tableName, tableId, id) {
    const spanner = new Spanner({
        projectId: projectId,
    });
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    const query = {
        sql: 'SELECT * FROM ' + tableName + ' WHERE ' + tableId + ' = @searchId' ,
        params: {
            searchId: id,
        }
    };

    try {
        const [rows] = await database.run(query);
        rows.forEach(row => {
            const json = row.toJSON();
            console.log(json);
        });
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await database.close();
    }
}

/* UPDATE */
async function updateData(instanceId, databaseId, projectId, tableName, rows) {
    const spanner = new Spanner({
        projectId: projectId,
    });
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    const tableN = database.table(tableName);

    try {
        /* rows es array [{ SingerId: '1', AlbumId: '1', MarketingBudget: '100000' }] */
        await tableN.update(rows);
        console.log('Updated data.');
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        database.close();
    }
}

/* DELETE */
async function deleteData(instanceId, databaseId, projectId, tableName, ids) {
    const spanner = new Spanner({
        projectId: projectId,
    });
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    const tableN = database.table(tableName);

    try {
        /* ids [[shardid, tableId] - [bookingid, passid] - [id]
                [2, 3],]; */
        await tableN.deleteRows(ids);
        console.log('Deleted individual rows in Albums.');
    } catch (err) {
        console.error('ERROR:', err);
    }
}


// pjson = require('../config/passenger.json');
// fjson = require('../config/flight.json');
// bjson = require('../config/booking.json');
bdjson = require('../config/bookingdetails.json');
bjson = require('../config/booking.json');

fjson = [
    {"flightid":3,"flightsource":"Oklahoma","flightdest":"California","flightdete":"2021-11-03","flightseat":93,"ticketcost":4677.0}
]


// insertData(config.instancia_id, config.database_id, config.project_id, 'passenger', pjson);
//insertData(config.instancia_id, config.database_id, config.project_id, 'flight', fjson);
//insertData(config.instancia_id, config.database_id, config.project_id, 'bookingdetails', bdjson);
//insertData(config.instancia_id, config.database_id, config.project_id, 'booking', bjson);

// readData(config.instancia_id, config.database_id, config.project_id, 'passenger');
// readData(config.instancia_id, config.database_id, conf);
// queryData(config.instancia_id, config.database_id, config.project_id, 'passenger', 'passid', 1);

// update = [{
//     shardid: 1,
//     passid: 1,
//     passname: 'Jeffrey Prado',
//     passemail: 'jeffgapra@espol.edu',
//     passdob: "2023-12-12"
// }]
// updateData(config.instancia_id, config.database_id, config.project_id, 'passenger', update);

// deleteData(config.instancia_id, config.database_id, config.project_id, 'passenger', [[1,1]]);
