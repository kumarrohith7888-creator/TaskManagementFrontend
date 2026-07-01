import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [category, setCategory] = useState("General");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log({
          title,
          description,
          status,
          priority,
          due_date: dueDate,
          assigned_to: assignedTo,
          category,
      });
      await API.post(
        "/tasks",
        {
          title,
          description,
          status,
          priority,
          due_date: dueDate,
          assigned_to: assignedTo ? parseInt(assignedTo) : null,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Task Created Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log(JSON.stringify(err.response.data,null,2));
      alert("Failed to create task");
    }
      
    
    
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Add New Task</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <br /><br />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <br /><br />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        <br /><br />

        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}

export default AddTask;