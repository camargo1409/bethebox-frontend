import { useContext } from "react";
import { Sidebar } from "../../components/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
        <Sidebar />
        <h1>Hello {user?.first_name} {user?.last_name}</h1>
    </>
  )
};

export default Dashboard;
