import { useEffect, useState } from 'react';
import { blogApi } from '../../services/api';
import { BlogList, BlogForm } from '../../components/blog';

export const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogApi.getAll();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  const handleCreateBlog = async (blogData) => {
    try {
      const newBlog = await blogApi.create(blogData);
      setBlogs([...blogs, newBlog]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Blog Posts</h1>
      <BlogForm onSubmit={handleCreateBlog} />
      <BlogList blogs={blogs} />
    </div>
  );
};
export default BlogPage