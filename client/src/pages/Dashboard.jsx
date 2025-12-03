import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import API from '../services/api';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { Search, Filter } from 'lucide-react'; // Import icons

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // --- NEW: Search & Filter State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'completed'

  const { register, handleSubmit, reset, setValue } = useForm();

  // 1. Fetch Tasks
  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Submit Logic (Create or Update)
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingId) {
        // Update existing task
        const { data: updatedTask } = await API.put(
          `/tasks/${editingId}`,
          data
        );
        setTasks(tasks.map((t) => (t._id === editingId ? updatedTask : t)));
        toast.success('Task updated!');
        setEditingId(null);
      } else {
        // Create new task
        const { data: newTask } = await API.post('/tasks', data);
        setTasks([...tasks, newTask]);
        toast.success('Task added!');
      }
      reset();
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // 3. Toggle Status Logic
  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      const { data: updatedTask } = await API.put(`/tasks/${task._id}`, {
        ...task,
        status: newStatus,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
      if (newStatus === 'completed') toast.success('Task completed!');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // 4. Edit Logic
  const startEditing = (task) => {
    setEditingId(task._id);
    setValue('title', task.title);
    setValue('description', task.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Cancel Edit Logic
  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  // 6. Delete Logic
  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  // --- NEW: Filter Logic ---
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TaskForm Component handles the Input Area */}
        <TaskForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          editingId={editingId}
          cancelEdit={cancelEdit}
          loading={loading}
        />

        {/* --- NEW: Search & Filter UI Bar --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          {/* Search Input */}
          <div className="relative w-full sm:w-1/2">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={20} className="text-gray-500" />
            <select
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Grid Area using TaskCard Components (Using filteredTasks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              toggleStatus={toggleStatus}
              startEditing={startEditing}
              deleteTask={deleteTask}
            />
          ))}

          {filteredTasks.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-10">
              {tasks.length === 0
                ? 'No tasks found. Start by adding one!'
                : 'No tasks match your search.'}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
