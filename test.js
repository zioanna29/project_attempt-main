import Papa from 'papaparse';

// URL of the CSV file
const csvFilePath = 'public/test_data/table_1.csv';

// Parse the CSV file
Papa.parse(csvFilePath, {
    download: true,
    header: true,
    complete: function(results) {
        // 'results.data' contains the parsed CSV data as an array of objects
        const csvData = results.data;
        console.log(csvData);

        // Now you can use 'csvData' as needed
    }
});
