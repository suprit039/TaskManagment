import { FaCheck, FaTrash, FaUndo } from 'react-icons/fa';
import { deleteTask, updateTask } from '../services/api';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const handleStatusToggle = async () => {
        try {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            const updatedTask = await updateTask(task._id, { status: newStatus });
            onTaskUpdated(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task._id);
            onTaskDeleted(task._id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const statusColor = task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition hover:shadow-lg">
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${statusColor}`}>
                        {task.status}
                    </span>
                </div>
                {task.description && (
                    <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
                )}
            </div>

            <div className="flex space-x-3 ml-4">
                <button
                    onClick={handleStatusToggle}
                    className={`p-2 rounded-full transition ${task.status === 'completed' ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                    title={task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                >
                    {task.status === 'completed' ? <FaUndo /> : <FaCheck />}
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    title="Delete Task"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
