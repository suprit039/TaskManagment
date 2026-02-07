
import { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchTasks = async () => {
        try {
            const data = await getTasks(filter);
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [filter]); // Re-fetch when filter changes

    const handleTaskDeleted = (id) => {
        setTasks(tasks.filter(task => task._id !== id));
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Tasks</h2>
                <select
                    className="p-2 border rounded"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                <div className="grid gap-4">
                    {tasks.map(task => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onTaskDeleted={handleTaskDeleted}
                            onTaskUpdated={handleTaskUpdated}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
