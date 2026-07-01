import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
  total_tasks: 0,
  completed_tasks: 0,
  pending_tasks: 0,
  high_priority_tasks: 0,
});

  useEffect(() => {
    fetchTasks();
    fetchDashboardStats();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);
      console.log("HEADER:", `Bearer ${token}`);

      const response = await API.get("/tasks", {
          headers: {
              Authorization: `Bearer ${token}`,
    },
  });

      setLoading(false);

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get("/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setStats(response.data);
  } catch (err) {
    console.log(err);
  }
};


  const deleteTask = async (taskId) => {
    try {
        await API.delete(`/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        alert("Task Deleted Successfully");

        fetchTasks();

    } catch (err) {
        console.log(err);
        alert("Delete Failed");
    }
};const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

  return (
    <div style={{ padding: "40px",
        background: "#f5f7fb",
        minHeight: "100vh",
        fontFamily: "Arial",
    }}>
      <h1
    style={{
      color: "#2563eb",
      marginBottom: "20px",
    }}
  >
      📋 Task Management Dashboard
      </h1>
    

      <div style={{ marginBottom: "25px" }}>

<button
  onClick={() => navigate("/add-task")}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px"
}}
>
➕ Add Task
</button>

<button
  onClick={()=>{  
  localStorage.removeItem("token");
  navigate("/");
}}
  style={{
    background:"#dc2626",
    color:"white",
    border:"none",
    padding:"10px 18px",
    borderRadius:"8px",
    cursor:"pointer"
}}
>
Logout

</button>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginTop: "25px",
    marginBottom: "25px",
  }}
>
  <div style={cardStyle}>
    <h3>Total Tasks</h3>
    <h1>{stats.total_tasks}</h1>
  </div>

  <div style={cardStyle}>
    <h3>Completed</h3>
    <h1>{stats.completed_tasks}</h1>
  </div>

  <div style={cardStyle}>
    <h3>Pending</h3>
    <h1>{stats.pending_tasks}</h1>
  </div>

  <div style={cardStyle}>
    <h3>High Priority</h3>
    <h1>{stats.high_priority_tasks}</h1>
  </div>
</div>
<input
  type="text"
  placeholder="🔍 Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    marginBottom: "25px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>
<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  style={{
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
>
  <option>All</option>
  <option>Pending</option>
  <option>Completed</option>
</select>
<select
  value={sort}
  onChange={(e) => setSort(e.target.value)}
  style={{
    padding: "10px",
    marginLeft: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
>
  <option>Newest</option>
  <option>Oldest</option>
</select>

</div>

      <h2>My Tasks</h2>

      
        {tasks
          .filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
      )
          .filter((task) =>
            filter === "All" ? true : task.status === filter
      )
          .sort((a, b) =>
            sort === "Newest"
              ? new Date(b.due_date) - new Date(a.due_date)
              : new Date(a.due_date) - new Date(b.due_date)
      )
          
        .map((task) => (
  <div
    key={task.id}
    style={{
      background: "white",
      padding: "15px",
      marginBottom: "15px",
      border:
        new Date(task.due_date) < new Date() &&
        task.status !== "Completed"
          ? "3px solid red"
          : "none",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    {new Date(task.due_date) < new Date() &&
task.status !== "Completed" && (
  <p
    style={{
      color: "red",
      fontWeight: "bold",
      marginBottom: "10px",
    }}
  >
    ⚠️ OVERDUE
  </p>
)}
    <h3 style={{ margin: "0 0 10px 0", color: "#2563eb" }}>
      {task.title}
    </h3>

    <p>
      <b>Description:</b> {task.description}
    </p>

    <p>
  <b>Status:</b>{" "}
  <span
    style={{
      background:
        task.status === "Completed" ? "#22c55e" : "#facc15",
      color: task.status === "Completed" ? "white" : "black",
      padding: "5px 10px",
      borderRadius: "20px",
      fontWeight: "bold",
    }}
  >
    {task.status}
  </span>
</p>

    <p>
  <b>Priority:</b>{" "}
  <span
    style={{
      color:
        task.priority === "High"
          ? "red"
          : task.priority === "Medium"
          ? "orange"
          : "green",
      fontWeight: "bold",
    }}
  >
    {task.priority}
  </span>
</p>

    <p>
      <b>Category:</b> {task.category}
    </p>

    <p>
      <b>Due Date:</b> {task.due_date}
    </p>
    <button
      onClick={() => navigate(`/edit-task/${task.id}`)}
      style={{
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        marginRight: "10px",
      }}
    >
      ✏ Edit
    </button>
    <button
      onClick={() => deleteTask(task.id)}
      style={{
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      🗑 Delete
    </button>
  </div>
))}
        
        

    </div>
  );
}

export default Dashboard;