import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
  deleteAllTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
    deleteAllTodo: () => dispatch(deleteAllTodos()),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active"); // tracks which tab is selected
  const [searchTerm, setSearchTerm] = useState(""); // tracks search text

  return (
    <div className="displaytodos">
      {/* 🔍 Search Box */}
      <div className="search-box" style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search todos..."
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

      {/* 🧭 Filter Buttons */}
      <div className="buttons">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort("active")}>
          Active
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort("completed")}>
          Completed
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort("all")}>
          All
        </motion.button>
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

      {/* 📋 Todo List with Search + Filter */}
      <ul>
        <AnimatePresence>
          {props.todos
            .filter((item) => {
              // 🔍 Filter by search term
              if (searchTerm.trim() === "") return true;
              return item.item.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .filter((item) => {
              // ⚙️ Filter by tab
              if (sort === "active") return item.completed === false;
              if (sort === "completed") return item.completed === true;
              return true;
            })
            .map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                removeTodo={props.removeTodo}
                updateTodo={props.updateTodo}
                completeTodo={props.completeTodo}
              />
            ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
