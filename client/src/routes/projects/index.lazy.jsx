import { createLazyFileRoute, Link } from "@tanstack/react-router";
import HeroSection from "../../components/HeroSection";
import ProjectCard from "../../components/ProjectCard";
import projectsData from "../../data/projects";

export const Route = createLazyFileRoute("/projects/")({
  component: Projects,
});

function Projects() {
  const projects = projectsData;

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
              <Link
                key={project._id}
                to="/projects/$projectId"
                params={{
                  projectId: project._id,
                }}
              >
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
