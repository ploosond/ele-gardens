import { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/employee/").then((res) => {
      setTeams(res.data);
    });
  }, []);
  console.log(teams);

  return <div>Team</div>;
};

export default Team;
