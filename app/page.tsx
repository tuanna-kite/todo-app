'use client';
import React from 'react';

/**
 * CRUD
 * 1. Tao task moi - Done
 * 2. Xem danh sach task - Done
 * 3. Xoa task - Done
 * 4. Sua task - Done
 */

type Task = string;

type TaskItemProps = {
  task: Task;
  index: number;
  onDelete?: (index: number) => void;
  onUpdate?: (index: number, newTask: Task) => void;
};

const TaskItem = ({ index, task, onDelete, onUpdate }: TaskItemProps) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>(task);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onEditClicked = () => {
    if (!isEdit) {
      toggleEdit();
    } else {
      if (text.trim() === '') {
        alert('Task name is required');
        return;
      }
      setText(text);
      if (onUpdate) {
        onUpdate(index, text);
      }
      toggleEdit();
    }
  };

  const onDeleteClicked = () => {
    if (onDelete) {
      onDelete(index);
    }
  };

  return (
    <li className='w-80 flex p-2 border border-gray-800 rounded-lg'>
      {isEdit ? (
        <input
          placeholder='Nhap task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span className='flex-1'>{task}</span>
      )}
      <div className='space-x-2'>
        <button
          onClick={onEditClicked}
          className='py-1 px-3 bg-blue-700 text-white text-sm rounded-lg'
        >
          {isEdit ? 'Save' : 'Edit'}
        </button>

        <button
          onClick={onDeleteClicked}
          className='py-1 px-3 bg-red-700 text-white text-sm rounded-lg'
        >
          Del
        </button>
      </div>
    </li>
  );
};

const HomePage = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [text, setText] = React.useState<string>('');

  const createTask = () => {
    if (text.trim() === '') {
      alert('Task name is required');
      return;
    }
    setTasks([...tasks, text]);
    setText('');
  };

  const deleteTask = (index: number) => {
    tasks.splice(index, 1);
    setTasks([...tasks]);
  };

  const updateTask = (index: number, newTask: Task) => {
    tasks[index] = newTask;
    setTasks([...tasks]);
  };

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center space-y-8'>
      <h1 className='text-3xl font-semibold'>Todo List</h1>
      <div className='space-x-4 w-80 flex'>
        <input
          type='text'
          placeholder='Enter task name'
          className='border p-2 rounded-md flex-1'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={createTask}
          className='bg-black text-white py-2 px-3 rounded-md hover:bg-black/80'
        >
          Add
        </button>
      </div>

      <div className='w-80 space-y-4'>
        <h2 className='text-center text-xl font-semibold text-blue-900'>
          Danh sách
        </h2>
        {tasks.length === 0 ? (
          <p className='text-center text-gray-600'>Không có task nào</p>
        ) : (
          <ul className='space-y-4'>
            {tasks.map((task, idx) => (
              <TaskItem
                task={task}
                key={task}
                index={idx}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
