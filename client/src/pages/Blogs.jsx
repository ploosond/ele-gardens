import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import WorkCard from "../components/WorkCard";

const blogs = [
  {
    id: 1,
    title: "The Art of Gardening",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quos deserunt accusantium earum quas.",
    image:
      "https://blogs.bcm.edu/wp-content/uploads/2022/08/child-gardening-515x343.png",
    details:
      "Gardening is not just a hobby; it's a way of life. It brings peace, joy, and a sense of accomplishment. In this blog, we explore the art of gardening, from choosing the right plants to maintaining a healthy garden.",
  },
  {
    id: 2,
    title: "Sustainable Gardening Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quos deserunt accusantium earum quas.",
    image:
      "https://www.gardenninja.co.uk/wp-content/uploads/2019/09/Lee-Burkhill-Garden-Blogger-Garden-Ninja-1024x720.jpg",
    details:
      "Sustainable gardening is all about working with nature. From composting to water conservation, this blog covers everything you need to know to make your garden more eco-friendly.",
  },
  {
    id: 3,
    title: "Top 10 Plants for Beginners",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quos deserunt accusantium earum quas.",
    image:
      "https://www.gardenninja.co.uk/wp-content/uploads/2019/09/Garden-Ninja-with-apples-1024x682.jpg",
    details:
      "If you're new to gardening, choosing the right plants can be overwhelming. In this blog, we list the top 10 plants that are easy to grow and maintain, perfect for beginners.",
  },
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Our"
        highlight="Blogs"
        description="Explore our collection of gardening blogs, filled with tips, tricks, and inspiration to help you create your dream garden."
      />

      {/* Blogs Section */}
      <div className="container mx-auto px-4 py-12">
        {/* If a blog is selected, show its details */}
        {selectedBlog ? (
          <div className="rounded-lg bg-white p-6 text-lg shadow-lg">
            <button
              onClick={() => {
                setSelectedBlog(null);
                setComments([]);
              }}
              className="hover:text-primary-dark mb-4 text-primary"
            >
              &larr; Back to Blogs
            </button>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="mb-4 h-64 w-full rounded-lg object-cover shadow-md"
            />
            <h3 className="mb-2 text-3xl font-bold text-gray-800">
              {selectedBlog.title}
            </h3>
            <p className="mb-4 text-gray-600">{selectedBlog.details}</p>

            {/* Comments Section */}
            <div className="mt-6">
              <h4 className="mb-2 text-xl font-semibold text-gray-800">
                Comments
              </h4>
              <div className="mb-4">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className="mb-2 rounded-md bg-gray-100 p-2 text-gray-700"
                    >
                      {comment}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleAddComment}
                  className="text-on-dark hover:bg-primary-dark rounded-md bg-primary px-4 py-2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Show all blogs if no blog is selected
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <WorkCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                onButtonClick={() => setSelectedBlog(blog)}
                buttonText="Read More"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
