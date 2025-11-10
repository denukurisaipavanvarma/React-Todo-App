import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";

// 🧠 We connect Redux so we can dispatch actions (like addTodos)
const mapDispatchToProps = (dispatch) => ({
  addTodo: (obj) => dispatch(addTodos(obj)),
});

const Todos = (props) => {
  // 🧠 State for the text input
  const [todo, setTodo] = useState("");

  // 🧠 Handle user typing into the input field
  const handleChange = (e) => setTodo(e.target.value);

  // 🧠 Function to add a new todo
  const add = () => {
    // 🔒 Prevent adding empty tasks
    if (todo.trim() === "") {
      alert("Input is empty");
      return;
    }

    // 🕒 Capture the system's current date and time
    const now = new Date();

    // 🧩 Format the date into readable format like "11/9/2025"
    const date = now.toLocaleDateString();

    // 🧩 Format the time like "10:45 AM"
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // 🧩 Create a new todo object
    // We're including 'date' and 'time' so we know *when* the task was created
    props.addTodo({
      id: Math.floor(Math.random() * 10000), // random id
      item: todo, // the task text
      completed: false, // default status
      date, // 🟩 auto-generated system date
      time, // 🟩 auto-generated system time
    });

    // 🧹 Clear the input field after adding
    setTodo("");
  };

  return (
    <div className="addTodos">
      {/* 🧩 Input box for entering task */}
      <input
        type="text"
        onChange={handleChange}
        className="todo-input"
        value={todo}
        placeholder="Enter your task..."
      />

      {/* 🧩 Add button (animated with framer-motion) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={add}
      >
        <GoPlus />
      </motion.button>
    </div>
  );
};

// 🧠 Connect Redux actions to the component
export default connect(null, mapDispatchToProps)(Todos);
