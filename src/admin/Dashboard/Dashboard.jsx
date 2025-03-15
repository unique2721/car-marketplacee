import Layout from "../ManageCars/Layout";
const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className="bg-blue-500 p-5 rounded-lg text-white">Total Cars: 50</div>
        <div className="bg-green-500 p-5 rounded-lg text-white">Total Users: 120</div>
        <div className="bg-purple-500 p-5 rounded-lg text-white">Total Revenue: $200,000</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
