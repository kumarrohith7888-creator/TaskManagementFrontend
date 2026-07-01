import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    category: "",
    due_date: "",
    assigned_to: "",
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const selectedTask = response.data.find(
        (item) => item.id === Number(id)
      );

      if (selectedTask) {
        setTask({
            title: selectedTask.title || "",
            description: selectedTask.description || "",
            status: selectedTask.status || "",
            priority: selectedTask.priority || "",
            category: selectedTask.category || "",
            due_date: selectedTask.due_date 
            ? selectedTask.due_date.substring(0, 10)
            : "",
            assigned_to: selectedTask.assigned_to || "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const updatedTask = {
        ...task,
        assigned_to: null,
  };

    await API.put(`/tasks/${id}`, updatedTask, 
    
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task Updated Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Edit Task</h1>

      <form onSubmit={updateTask}>

        <input
          value={task.title}
          onChange={(e) =>
            setTask({ ...task, title: e.target.value })
          }
          placeholder="Title"
        />

        <br /><br />

        <textarea
          value={task.description}
          onChange={(e) =>
            setTask({
              ...task,
              description: e.target.value,
            })
          }
        />

        <br /><br />

        <select
          value={task.status}
          onChange={(e) =>
            setTask({
              ...task,
              status: e.target.value,
            })
          }
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <br /><br />

        <select
          value={task.priority}
          onChange={(e) =>
            setTask({
              ...task,
              priority: e.target.value,
            })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <br /><br />

        <input
          value={task.category}
          onChange={(e) =>
            setTask({
              ...task,
              category: e.target.value,
            })
          }
          placeholder="Category"
        />

        <br /><br />

        <input
          type="date"
          value={task.due_date}
          onChange={(e) =>
            setTask({
              ...task,
              due_date: e.target.value,
            })
          }
        />

        <br /><br />

        <input
          value={task.assigned_to}
          onChange={(e) =>
            setTask({
              ...task,
              assigned_to: e.target.value,
            })
          }
          placeholder="Assigned To"
        />

        <br /><br />

        <button type="submit">
          Save Changes
        </button>

      </form>
    </div>
  );
}

export default EditTask;