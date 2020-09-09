import React, { useState } from "react";
import classNames from "classnames";

const Layout = ({ children }) => (
  <section className="todoapp">{children}</section>
);

const Header = ({ children, loading }) => (
  <header className={classNames("header", { loading })}>
    <h1>todos</h1>
    {children}
  </header>
);

const NewTodo = ({ create }) => {
  const [title, setTitle] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (title.length) {
      create({ title });
      setTitle("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};

const TodoList = ({ todos, remove, update }) => (
  <section className="main">
    <ul className="todo-list">
      {todos
        .sort((a, b) => (a.id < b.id ? -1 : 1))
        .map(todo => (
          <Todo
            key={todo.id}
            onRemove={() => remove(todo)}
            onUpdate={update}
            todo={todo}
          />
        ))}
    </ul>
  </section>
);

const Todo = ({ todo, onRemove, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const submitTitle = e => {
    e.preventDefault();
    onUpdate({ ...todo, title, completed });
    setEditing(false);
  };

  const submitCompleted = e => {
    onUpdate({ ...todo, title, completed: e.target.checked });
    setCompleted(e.target.checked);
  };

  return (
    <li
      className={classNames({ completed, editing })}
      onDoubleClick={() => setEditing(true)}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={submitCompleted}
        />
        <label>{title}</label>
        <button className="destroy" onClick={onRemove} />
      </div>
      <input
        className="edit"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={submitTitle}
      />
    </li>
  );
};

export { Layout, Header, NewTodo, TodoList };
