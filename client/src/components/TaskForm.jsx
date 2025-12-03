import { X, Plus, Edit2 } from 'lucide-react';

const TaskForm = ({
  register,
  handleSubmit,
  onSubmit,
  editingId,
  cancelEdit,
  loading,
}) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md mb-8 transition-colors ${
        editingId ? 'bg-blue-50 border border-blue-200' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {editingId ? 'Edit Task' : 'Add New Task'}
        </h2>
        {editingId && (
          <button
            onClick={cancelEdit}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X size={16} /> Cancel Edit
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 flex-col sm:flex-row"
      >
        <input
          {...register('title', { required: true })}
          placeholder="Task Title"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          {...register('description')}
          placeholder="Description (Optional)"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={loading}
          className={`text-white px-6 py-2 rounded flex items-center justify-center gap-2 transition-colors ${
            editingId
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editingId ? <Edit2 size={18} /> : <Plus size={18} />}
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
