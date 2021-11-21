import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CC from "./cases.json";
import covid from "./image/covid.jpeg";
import { Card ,Table } from "./Components";

function App() {
  let today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const [totalIndiaCase, setTotalIndiaCase] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalStateWiseCount, setTotalStateWiseCount] = useState([]);
  const [totalStateArrayLength, setTotalStateArrayLength] = useState("");
  let [filteredData] = useState();


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const resp = await axios.get("https://projectkeliye.github.io/CovidCases19-JSON-API/cases.json");
    setTotalIndiaCase(resp.data.statewise.slice(0, 1));
    const totalStateWiseCount = resp.data.statewise.slice(1);
    setTotalStateWiseCount(totalStateWiseCount);
    setTotalStateArrayLength(totalStateWiseCount.lenght);
    setLoading(false);
  };


  const stateSearch = (searchText) => {
    filteredData = totalStateWiseCount.filter((value) => {
      return value.state.toLowerCase().includes(searchText.toLowerCase());
    })
    setTotalStateWiseCount(filteredData);
  };

  return (
    <div className="App">
      <span>
        <img src={covid} style={{ height: "150px" }} alt="COVID-19" />
        <h1>LIVE INDIA TRACKER</h1>
      </span>
      <h2>As of {date}</h2>
      <Card totalIndiaCase={totalIndiaCase} />
      <Table 
      totalStateWiseCount={totalStateWiseCount}
      totalStateArrayLength={setTotalStateArrayLength}
      loading={loading}
      loadData={loadData}
      filteredData={filteredData}
      stateSearch={stateSearch}
      />
    </div>
  );
}

export default App;
