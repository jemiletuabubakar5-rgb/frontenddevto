// src/components/CommentForm.jsx
import PropTypes from 'prop-types';

const CommentForm = ({ value, onChange, onSubmit, loading, disabled }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value); // Pass just the comment value
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Add a comment..."
          aria-label="Add a comment"
          disabled={disabled}
          className={`flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            disabled ? 'bg-gray-100' : ''
          }`}
        />
        <button
          type="submit"
          disabled={disabled || loading || !value.trim()}
          className={`bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors ${
            disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

CommentForm.defaultProps = {
  loading: false,
  disabled: false
};

export default CommentForm;

