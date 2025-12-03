import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';

const TaskCard = ({ task, toggleStatus, startEditing, deleteTask }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow border transition-all ${
        task.status === 'completed'
          ? 'opacity-75 bg-gray-50'
          : 'border-gray-100'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3
            className={`font-bold text-lg text-gray-800 ${
              task.status === 'completed' ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.title}
          </h3>
          <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
        </div>

        <button
          onClick={() => toggleStatus(task)}
          className={`transition-colors ${
            task.status === 'completed'
              ? 'text-green-600'
              : 'text-gray-300 hover:text-green-500'
          }`}
          title={
            task.status === 'completed'
              ? 'Mark as Pending'
              : 'Mark as Completed'
          }
        >
          {task.status === 'completed' ? (
            <CheckCircle size={24} />
          ) : (
            <Circle size={24} />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            task.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          onClick={() => startEditing(task)}
          className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm"
        >
          <Edit2 size={16} /> Edit
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1 text-sm"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
