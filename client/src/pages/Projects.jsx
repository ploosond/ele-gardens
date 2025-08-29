import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects";
import { useNavigate } from "react-router";

const Projects = () => {
  const projects = projectsData;
  const navigate = useNavigate();

  // navigate to project route (React Router will render ProjectDetail)
  const openProject = (p) => navigate(`/projects/${p.id}`);

  return (
    <div>
      <HeroSection
        title="Our Work"
        highlight="Projects"
        description="Browse recent landscape and garden projects — from private patios to commercial landscapes — showcasing our design, planting, and long-term care approach."
      />

      <div className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={openProject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
