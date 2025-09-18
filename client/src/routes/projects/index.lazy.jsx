import { createLazyFileRoute, Link } from "@tanstack/react-router";
import HeroSection from "../../utils/HeroSection";
import ProjectCard from "../../components/ProjectCard";
import projectsData from "../../data/projects";
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/projects/")({
  component: Projects,
});

function Projects() {
  const { t } = useTranslation("projects");
  const projects = projectsData;

  return (
    <div>
      <HeroSection
        title={t("hero_title")}
        highlight={t("hero_highlight")}
        description={t("hero_description")}
      />
      {/* Project Grid */}
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12">
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
  );
}

export default Projects;
