import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaList, FaLightbulb, FaCode, FaRobot, FaBriefcase, FaBook, FaChartBar, FaShieldAlt, FaPalette, FaRocket, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const LeftSidebar = ({ onCategorySelect, selectedCategory }) => {
  const { theme } = useSelector((state) => state.themeSliceApp);
  const [isOpen, setIsOpen] = useState(true);
  const categories = ['All', 'Technology & Innovation', 'Programming & Development', 'Artificial Intelligence & Machine Learning', 'Career & Personal Growth', 'Education & Learning Resources', 'Data Science & Analytics', 'Cybersecurity & Privacy', 'Web Design & UI/UX', 'Startups & Entrepreneurship', 'Tech Reviews & Product Insights'];
  const icons = [FaList, FaLightbulb, FaCode, FaRobot, FaBriefcase, FaBook, FaChartBar, FaShieldAlt, FaPalette, FaRocket, FaStar];

  return (
    <div className={`w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between mb-2 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span>Categories</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <ul className={`space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
        {categories.map((category, index) => {
          const Icon = icons[index];
          return (
            <li key={category}>
              <button
                onClick={() => {
                  onCategorySelect(category === 'All' ? '' : category);
                }}
                className={`w-full text-left p-2 rounded-md transition-all duration-200 ease-in-out hover:translate-x-1 hover:bg-blue-100 hover:text-blue-800 ${
                  selectedCategory === category || (selectedCategory === '' && category === 'All')
                    ? 'bg-blue-100 text-blue-800 font-bold'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="mr-2 inline" />
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSidebar;