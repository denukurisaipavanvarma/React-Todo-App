import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
  deleteAllTodos,
} from "../redux/reducer";
import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "./TodoItem";

// 🧠 Connect Redux state to component
const mapStateToProps = (state) => ({ todos: state });

// 🧠 Map Redux dispatch functions to props
const mapDispatchToProps = (dispatch) => ({
  addTodo: (obj) => dispatch(addTodos(obj)),
  removeTodo: (id) => dispatch(removeTodos(id)),
  updateTodo: (obj) => dispatch(updateTodos(obj)),
  completeTodo: (id) => dispatch(completeTodos(id)),
  deleteAllTodo: () => dispatch(deleteAllTodos()),
});

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active"); // Tab selection: active/completed/all
  const [searchTerm, setSearchTerm] = useState(""); // For global search (text/date)

  // 🎨 Optional: badge color depending on task status
  const badgeStyle = (completed) => ({
    backgroundColor: completed ? "#3498db" : "#27ae60",
    color: "white",
    padding: "0.2rem 0.6rem",
    borderRadius: "10px",
    fontSize: "0.8rem",
    marginLeft: "0.5rem",
  });

  return (
    <div className="displaytodos">
      {/* 🔍 SEARCH BOX */}
      <div className="search-box" style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search todos... (e.g. 'react' or '11/9/2025')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "2px solid #271c6c",
            width: "60%",
            fontSize: "1rem",
            outline: "none",
            color: "#271c6c",
          }}
        />
      </div>

      {/* 🧭 FILTER BUTTONS */}
      <div className="buttons">
        {/* Tabs are disabled when searching (so results don’t conflict) */}
        <motion.button
          disabled={searchTerm.trim() !== ""}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>

        <motion.button
          disabled={searchTerm.trim() !== ""}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>

        <motion.button
          disabled={searchTerm.trim() !== ""}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>

        {/* 🗑️ Delete All button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (window.confirm("Are you sure you want to delete all todos?")) {
              props.deleteAllTodo();
            }
          }}
          style={{
            backgroundColor: "#c0392b",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "0.5rem 1.2rem",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          Delete All
        </motion.button>
      </div>

      {/* 🔎 Optional helper text showing what’s being searched */}
      {searchTerm && (
        <p style={{ color: "#888", marginTop: "1rem" }}>
          Showing results for "<strong>{searchTerm}</strong>"
        </p>
      )}

      {/* 📋 TODOS LIST */}
      <ul>
        <AnimatePresence>
          {props.todos
            .filter((item) => {
              // ✅ CASE 1: SEARCH MODE (when something is typed)
              if (searchTerm.trim() !== "") {
                const searchLower = searchTerm.toLowerCase();

                // 🧩 Check if input looks like a date (e.g. 11/9/2025)
                const isDateSearch = /\d{1,2}\/\d{1,2}\/\d{4}/.test(searchTerm);

                if (isDateSearch) {
                  // 🟩 Normalize both sides to avoid mismatch like “11/09/2025” vs “11/9/2025”
                  const normalizeDate = (d) =>
                    d.replace(/^0+/, "").replace(/\/0/g, "/");

                  // 🧠 Compare normalized system date (from todo) with search date
                  return (
                    normalizeDate(item.date) === normalizeDate(searchTerm)
                  );
                }

                // 🧠 Otherwise, search by text (todo item name)
                return item.item.toLowerCase().includes(searchLower);
              }

              // ✅ CASE 2: NORMAL MODE (tabs only)
              if (sort === "active") return item.completed === false;
              if (sort === "completed") return item.completed === true;
              return true; // "all"
            })

            // ✅ Render filtered todos
            .map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TodoItem
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />

                  {/* 🟩 STATUS BADGE */}
                  {searchTerm.trim() !== "" && (
                    <span style={badgeStyle(item.completed)}>
                      {item.completed ? "Completed" : "Active"}
                    </span>
                  )}
                </div>
                </div>

            ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
