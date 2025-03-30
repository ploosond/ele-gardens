import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import WorkCard from "../components/WorkCard";

const projects = [
  {
    id: 1,
    title: "Urban Oasis",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere vero est dolor suscipit totam maxime, perferendis perspiciatis officia laboriosam eaque. Eaque illum atque, laboriosam ea maiores laborum praesentium nobis cupiditate.",
    image:
      "https://new-mags.com/cdn/shop/files/TE1174_3_73920070-0f8a-438a-a7da-e8ee28913a12.jpg?v=1738050005&width=800",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque quos, sapiente beatae ipsa rem, voluptates omnis dolorum laudantium veritatis assumenda quod nesciunt doloribus tempore reiciendis atque fugiat molestias, quis obcaecati?",
  },
  {
    id: 2,
    title: "Tropical Paradise",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa labore cumque tempore ut at praesentium explicabo tenetur adipisci repellat quasi, numquam nesciunt reprehenderit ipsam ea nostrum, voluptatum, facilis enim accusamus.",
    image:
      "https://images.stockcake.com/public/3/c/7/3c7e1083-8bc6-4935-815b-6646b0694df7_large/blooming-tropical-garden-stockcake.jpg",
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed at repellat hic distinctio incidunt aliquam exercitationem ipsum fuga tempore esse, ratione provident delectus laudantium dolorem aliquid perferendis, nemo officiis! Ad!",
  },
  {
    id: 3,
    title: "Zen Retreat",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt quo repudiandae unde labore qui quas quae provident quisquam sit suscipit quidem repellat eum, cupiditate facere atque quaerat cumque maxime veritatis.",
    image:
      "https://cdn.mos.cms.futurecdn.net/ZckPgCsxr3fGxedTQmD7t3-1024-80.jpg.webp",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum accusamus, non a pariatur, eveniet sint explicabo architecto, vel tempora minus dolorum consectetur. Quidem aliquam perferendis quo sunt ipsa blanditiis quod.",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Our"
        highlight="Projects"
        description="Lorem  adipisicing elit. saepe sequi! Possimus in nam soluta, quae harum sunt voluptate impedit animi exercitationem sapiente."
      />

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-12">
        {/* If a project is selected, show its details */}
        {selectedProject ? (
          <div className="rounded-lg bg-white p-6 text-lg shadow-lg">
            <button
              onClick={() => setSelectedProject(null)}
              className="mb-4 text-green-600 hover:text-green-800"
            >
              &larr; Back to Projects
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="mb-4 h-64 w-full rounded-lg object-cover"
            />
            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              {selectedProject.title}
            </h3>
            <p className="mb-4 text-gray-600">{selectedProject.details}</p>
          </div>
        ) : (
          // Show all projects if no project is selected
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <WorkCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                onButtonClick={() => setSelectedProject(project)}
                buttonText="View Details"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
