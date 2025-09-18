import projectsData from "../../data/projects";
import { createFileRoute } from "@tanstack/react-router";
import BackButton from "../../utils/BackButton";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { t, i18n } = useTranslation("project");
  const lang = i18n.language?.split("-")[0] || "de";
  const { projectId } = Route.useParams();
  const project = projectsData.find((p) => String(p._id) === String(projectId));

  return (
    <article
      aria-labelledby="project-title"
      tabIndex={-1}
      className="mx-auto mt-8 px-4 sm:mt-12 sm:px-6 lg:px-8"
    >
      {/* Back Button */}
      <BackButton
        to="/projects"
        label={t("back_to_projects")}
        className="mb-6"
      />

      {/* Title above image for visibility */}
      <header className="mb-6">
        <h1
          id="project-title"
          className="text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
        >
          {project.title[lang]}
        </h1>
      </header>

      {/* Larger hero image */}
      <div className="mx-auto mb-10 flex max-w-4xl justify-center">
        <div className="w-full overflow-hidden rounded border border-gray-200 bg-white shadow-lg">
          <img
            src={project.image}
            alt={project.title[lang]}
            loading="lazy"
            className="h-72 w-full object-cover object-center sm:h-80 lg:h-96"
          />
        </div>
      </div>

      {/* Grid: main/aside */}
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Main content (starts at col 1, row 2) */}
        <main className="prose prose-base dark:prose-invert max-w-none lg:col-span-2">
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-extrabold text-secondary sm:mb-6 sm:text-2xl">
              {t("about")}
            </h2>
            <p className="mb-2 text-justify text-sm text-gray-700 sm:mb-4 sm:text-base">
              {project.about[lang]}
            </p>
          </section>
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-extrabold text-secondary sm:mb-6 sm:text-2xl">
              {t("challenge")}
            </h2>
            <p className="mb-2 text-justify text-sm text-gray-700 sm:mb-4 sm:text-base">
              {project.challenge[lang]}
            </p>
          </section>
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-extrabold text-secondary sm:mb-6 sm:text-2xl">
              {t("solution", "The solution")}
            </h2>
            <p className="mb-2 text-justify text-sm text-gray-700 sm:mb-4 sm:text-base">
              {project.solution[lang]}
            </p>
          </section>
          <section>
            <h2 className="mb-4 text-xl font-extrabold text-secondary sm:mb-6 sm:text-2xl">
              {t("result")}
            </h2>
            <div className="bg-primary/10 mt-2 rounded-lg">
              <p className="mb-2 text-justify text-sm text-gray-700 sm:mb-4 sm:text-base">
                {project.result[lang]}
              </p>
            </div>
          </section>
        </main>

        {/* Aside / meta (starts at col 3, row 2) */}
        <aside className="lg:sticky lg:top-20">
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <span className="bg-accent/10 text-md inline-block rounded-full py-1 font-semibold uppercase tracking-wide text-secondary">
                {project.category[lang]}
              </span>
            </div>
            <dl className="space-y-3 text-sm text-gray-600">
              {project.client && (
                <div>
                  <dt className="font-medium text-text">{t("client")}</dt>
                  <dd>{project.client}</dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}
