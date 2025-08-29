import React from "react";

export default function ProjectCard({ project, onOpen }) {
  if (!project) return null;
  const handleOpen = () => {
    if (typeof onOpen === "function") onOpen(project);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
      aria-label={`Open case study: ${project.title}`}
      className="border-muted/10 hover:border-muted/20 group flex h-full transform cursor-pointer flex-col overflow-hidden rounded-sm border bg-white/5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:-translate-y-1 focus-visible:shadow-lg focus-visible:ring-4 focus-visible:ring-primary/20"
    >
      {/* Cover image */}
      <div className="bg-surface relative h-56 w-full overflow-hidden sm:h-64 md:h-56 lg:h-64">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* subtle gradient overlay for legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            {project.client && (
              <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">
                {project.client}
              </p>
            )}

            <h3 className="text-text line-clamp-2 text-lg font-semibold leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-text line-clamp-3 text-sm">{project.tagline}</p>
      </div>
    </article>
  );
}
