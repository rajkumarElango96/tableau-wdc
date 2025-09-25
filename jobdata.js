(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "jobfamily",
            alias: "Department",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "jobtype",
            alias: "Type",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "location",
            alias: "Location",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "absoluteurl",
            alias:"Link",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "jobfeed",
            alias: "Details of jobs that have been loaded for a specific company",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://localhost:8000/fetch", function(response) {
            console.log(response)
            resp = response.data
            
            var tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                console.log(resp[i][0])
                tableData.push({
                    "id": resp[i][4],
                    "jobfamily": resp[i][3],
                    "jobtype": resp[i][1],
                    "location": resp[i][2],
                    "absoluteurl": resp[i][0]
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };
    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Job Feed";
        tableau.submit();
    });
});