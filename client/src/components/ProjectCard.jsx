import { useTranslation } from "react-i18next";
export default function ProjectCard({ project }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "de";
  return (
    <article className="border-muted/10 hover:border-muted/20 focus-visible:ring-primary/20 group flex h-full transform cursor-pointer flex-col overflow-hidden rounded-sm border bg-white/5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:-translate-y-1 focus-visible:shadow-lg focus-visible:ring-4">
      {/* Cover image */}
      <div className="relative h-56 w-full overflow-hidden rounded bg-surface sm:h-64 md:h-56 lg:h-64">
        <img
          src={project.image}
          alt={project.title[lang]}
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
            <p className="mb-1 text-xs uppercase tracking-widest text-secondary">
              {project.client}
            </p>

            <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-primary">
              {project.title[lang]}
            </h3>
          </div>
        </div>
        <p className="line-clamp-3 text-sm text-text">
          {project.tagline[lang]}
        </p>
      </div>
    </article>
  );
}
