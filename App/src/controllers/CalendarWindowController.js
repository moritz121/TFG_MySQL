const mysql = require('mysql');
const ipcRenderer = require('electron').ipcRenderer;
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'MyNewPass1234@',
database: 'db_nuclear_analisys'
});

function newAnalisysRequest() {
    console.log('New Analisys Resquested');
    ipcRenderer.send('requestNewAnalisys');
}

$(() => {
        let $table = $('#table-hover-calendar');
        // Event listener
        // $(document).ready(function() {
            $('#table-hover-calendar').on('click', 'tr', function() {
                console.log('Sending analyzed_tube id: '+$(this).attr('id'));
                ipcRenderer.send('analyzedTubeclick', $(this).attr('id'));
            });
        // });

        // Requesting current tube

        ipcRenderer.send('requestCurrentTube');
        console.log('Requesting Current Tube');
        ipcRenderer.on('responseRequestCurrentTube', (e,thisCurrentTube) => {
            console.log('Current Tube response received with tube: '+thisCurrentTube);
        
        
            console.log('Current Tube: '+thisCurrentTube);

            //My SQL Connection and Queries

            connection.query('select ID_Analyzed_Tube, AcqDate from Analyzed_Tube AS ANT inner join Aquired_Tubes as AQT ON AQT.ID_Aquired_Tubes = ANT.ID_Aquired_Tubes_FK inner join Tube as T on T.ID_Tube = AQT.ID_Tube_FK where T.ID_Tube = '+thisCurrentTube+';', function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ' + results[0].ID_Analyzed_Tube + ' ' + results[0].AcqDate);
                let obj = Object.keys(results);
                // Writting the list of tubes
                $table.empty();
                console.log(results);
                for(var i=0; i<obj.length; i++) {
                    $table.append('<tr class="table-secondary analyzed_tube" id="'+results[i].ID_Analyzed_Tube+'">'+'<th scope="row" id="table-th">Analyzed_Tube '+results[i].ID_Analyzed_Tube+'</th>'+'<th scope="col" id="table-th">'+results[i].AcqDate+'</th>'+'</tr>');
                }

            });

        });

});
