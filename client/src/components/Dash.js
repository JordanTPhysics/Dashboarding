import React, { useEffect, useState } from "react";
import TimeSeriesChart from "./TimeSeriesChart/TimeSeriesChart";


function parseCSV(csvData) {
  csvData = csvData.replace(/\r/g, "");
  var rows = csvData.split("\n");

  var headers = rows[0].split(",");

  var result = [];

  for (var i = 1; i < rows.length; i++) {
    var values = rows[i].split(",");
    var rowObject = {};

    for (var j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = values[j];
    }

    result.push(rowObject);
  }

  return result;
}

const Dash = () => {
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await fetch("resources/TestDataRemovedText.csv");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        const parsedData = parseCSV(data);
        setDataSet(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing CSV file:", error);
      }
    };
    fetchDataset();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="row frame">

        <TimeSeriesChart data={dataSet} yAxisLabel="Review Sentiment - Timeseries" />
      </div>

    </>
  );
};

export default Dash;
