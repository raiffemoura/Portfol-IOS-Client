import React, { useState, useRef } from "react";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import "../styles/reminders.css";
import iconConfig from "../components/iconConfig";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Reminders() {
  const [newTask, setNewTask] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const remindersTasksRefs = useRef([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { t } = useTranslation();

  const format = (str) => {
    return str.slice(0, 50) + "...";
  };

  const addNewTask = (newTask) => {
    if (newTask.trim().length > 0 && newTask.length < 55) {
      const newTaskObject = {
        id: allTasks.length + 1,
        task: newTask,
        completed: false,
      };
      setAllTasks([newTaskObject, ...allTasks]);
      setNewTask("");
    } else if (newTask.length >= 55) {
      const newTaskObject = {
        id: allTasks.length + 1,
        task: format(newTask),
        completed: false,
      };
      setAllTasks([newTaskObject, ...allTasks]);
      setNewTask("");
    } else {
      alert(t("pleaseAddReminder"));
    }
  };

  const toggleTask = (id) => {
    setAllTasks(
      allTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        } else {
          return {
            ...task,
          };
        }
      })
    );
  };

  const deleteTask = (id) => {
    setAllTasks(allTasks.filter((task) => task.id !== id));
  };

  const handleMouseDown = (e, index) => {
    setIsMouseDown(true);
    setStartX(e.pageX);
    const scrollLeft = remindersTasksRefs.current[index].scrollLeft;
    setScrollLeft(scrollLeft);
  };

  const handleMouseMove = (e, index) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1;
    remindersTasksRefs.current[index].scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const renderTasks = () => {
    const sortedTasks = allTasks.sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      } else if (a.completed) {
        return 1;
      } else {
        return -1;
      }
    });

    return sortedTasks.map((task, index) => (
      <div
        key={task.id}
        className="reminders-task"
        ref={(element) => (remindersTasksRefs.current[index] = element)}
        onMouseDown={(e) => handleMouseDown(e, index)}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onMouseUp={handleMouseUp}
      >
        <label>
          <div>
            <div>
              <input
                className="reminders-checkbox"
                type="checkbox"
                checked={task.completed}
                readOnly
              />
              <span
                className="reminders-checkbox-custom"
                onClick={() => toggleTask(task.id)}
              ></span>
              <div
                className="reminders-task-text"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                <p onClick={() => toggleTask(task.id)}>{task.task}</p>
              </div>
            </div>
            <div
              onClick={() => deleteTask(task.id)}
              className="reminders-trash"
            >
              <p>{t("delete")}</p>
            </div>
          </div>
        </label>
      </div>
    ));
  };

  return (
    <div className="container-calculator">
      <div className="screen">
        <Header />
        <div className="reminders-header">
          <div className="reminders-title">
            <Link to={"/"}>
              <img src={iconConfig.arrowBackBlue} alt="" />
            </Link>
            <h2>{t("today")}</h2>
          </div>
          <div className="reminders-buttons">
            <img src={iconConfig.remindersShare} alt="" />
            <img src={iconConfig.remindersMore} alt="" />
          </div>
        </div>
        <div className="reminders-container">
          <h2>{t("remindersTitle")}</h2>
          <div className="reminders-new-task">
            <input
              type="text"
              className="reminders-new-task-input"
              placeholder={t("addReminder")}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={() => addNewTask(newTask)}>
              <img src={iconConfig.remindersNewTask} alt="new task" />
            </button>
          </div>
          <div className="reminders-tasks">{renderTasks()}</div>
        </div>
        <HomeButton />
      </div>
    </div>
  );
}
