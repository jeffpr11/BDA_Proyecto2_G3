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

module.exports = {
    /* READ ALL */
    list: async function (req, res) {
        const spanner = new Spanner({
            projectId: config.project_id,
        });
        const instance = spanner.instance(config.instancia_id);
        const database = instance.database(config.database_id);

        var tableName = req.params.table;

        const tableN = database.table(tableName);

        const query = { 
            columns: getColumns(tableName),
            keySet: {
                all: true,
            },
        };

        try {
            var lista = [];
            const [rows] = await tableN.read(query);
            rows.forEach(row => {
                const json = row.toJSON();
                lista.push(json);
            });
            const title = "Proyecto Segundo Parcial - Airline";
            const group = "Grupo #3: Evelyn Mejia y Jeffrey Prado";
            res.render('index', { list: lista,  
                title: title, group: group 
            });
        } catch (err) {
            console.error('ERROR:', err);
            res.status(500).send({ message: err.message || "Some error occurred while retrieving table."})
        } finally {
            await database.close();
        }
    },

    /* READ ONE */
    show: async function (req, res) {
        const spanner = new Spanner({
            projectId: config.project_id,
        });
        const instance = spanner.instance(config.instancia_id);
        const database = instance.database(config.database_id);

        var tableName = req.params.table;
        var tableId = req.query.tableId;
        var id = req.params.id;

        const query = {
            sql: 'SELECT * FROM ' + tableName + ' WHERE ' + tableId + ' = @searchId' ,
            params: {
                searchId: id,
            }
        };
    
        try {
            var dato = [];
            const [rows] = await database.run(query);
            // console.log(rows);
            rows.forEach(row => {
                const json = row.toJSON();
                dato.push(json);
            });
            console.log(dato);

            res.render('detail', { data: dato, title: 'Detail' });
        } catch (err) {
            console.error('ERROR:', err);
        } finally {
            await database.close();
        }
    },

    /* CREATE */
    create: async function (req, res) {
        const spanner = new Spanner({
            projectId: config.project_id,
        });
        const instance = spanner.instance(config.instancia_id);
        const database = instance.database(config.database_id);

        var tableName = req.params.table;
        var json = req.body;

        console.log(json);

        const tableN = database.table(tableName);
        

        try {
            await tableN.insert(json);
            console.log('Inserted data.');

            var url = "/table/" + tableName;
            res.redirect(url);
        } catch (err) {
            console.error('ERROR:', err);
            return res.status(500).json({message: 'Error when creating row', error: err});
        } finally {
            await database.close();
        }
    },

    /* UPDATE */
    update: async function (req, res) {
        const spanner = new Spanner({
            projectId: config.project_id,
        });
        const instance = spanner.instance(config.instancia_id);
        const database = instance.database(config.database_id);

        var tableName = req.params.table;
        var row = req.body;

        console.log(row);
    
        const tableN = database.table(tableName);
    
        try {
            /* rows es array [{ SingerId: '1', AlbumId: '1', MarketingBudget: '100000' }] */
            await tableN.update(row);
            console.log('Updated data.');

            var url = "/table/" + tableName;
            res.redirect(url);
        } catch (err) {
            console.error('ERROR:', err);
            return res.status(500).json({message: 'Error when updating row', error: err});
        } finally {
            database.close();
        }
    },

    /* DELETE */
    remove: async function (req, res) {
        const spanner = new Spanner({
            projectId: config.project_id,
        });
        const instance = spanner.instance(config.instancia_id);
        const database = instance.database(config.database_id);

        var tableName = req.params.table;
        var ids = req.params.id;

        const tableN = database.table(tableName);

        try {
            /* ids [[shardid, tableId] - [bookingid, passid] - [id]
                    [2, 3],]; */
            await tableN.deleteRows(ids);
            console.log('Deleted individual rows in Albums.');
            var url = "/table/" + tableName;
            res.redirect(url);
        } catch (err) {
            console.error('ERROR:', err);
            return res.status(500).json({message: 'Error when deleting row', error: err});
        }
    }
};
