
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { createTask } from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // We don't need to pass token here if api.js handles it, 
    // but api.js currently doesn't have access to context or local storage automatically
    // unless we modify api.js to read from localStorage.

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            await createTask({ title, description });
            setTitle('');
            setDescription('');
            if (onTaskAdded) onTaskAdded();
            // Note: In the new Dashboard layout, we might need a way to trigger refresh in TaskList.
            // But TaskList fetches on mount. 
            // We'll need a way to communicate between Form and List. 
            // FOR NOW: We will reload page or implement context for tasks later.
            // Actually, best to reload window or pass callback. 
            // In App.jsx, Dashboard has TaskForm and TaskList side-by-side.
            // We need a refresh trigger.
            window.location.reload(); // Simple fix for now
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description (Optional)</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center font-bold disabled:opacity-50"
            >
                <FaPlus className="mr-2" /> {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
