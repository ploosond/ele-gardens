import projectsData from "../../data/projects";
import { createFileRoute } from "@tanstack/react-router";
import BackButton from "../../components/BackButton";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const project = projectsData.find((p) => String(p._id) === String(projectId));
  console.log(project);

  return (
    <article
      aria-labelledby="project-title"
      tabIndex={-1}
      className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8"
    >
      {/* Back Button */}
      <BackButton
        to="/projects"
        label="Back to Projects"
        className="mb-6"
      />

      {/* Hero image */}
      <div className="-mx-4 mb-8 sm:mx-0">
        <div className="overflow-hidden rounded shadow-lg">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-72 w-full object-cover sm:h-[28rem] lg:h-[34rem]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
        {/* Main content */}
        <main className="prose prose-lg dark:prose-invert max-w-none lg:col-span-2">
          <h1
            id="project-title"
            className="mb-2 text-4xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            {project.title}
          </h1>

          <hr className="my-6" />

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">About</h2>
            <p className="text-base leading-relaxed text-gray-700">
              {project.about}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              The challenge
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              {project.challenge}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              The solution
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              {project.solution}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              The result
            </h2>
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-base font-medium text-text">
                {project.result}
              </p>
            </div>
          </section>
        </main>

        {/* Aside / meta */}
        <aside className="lg:sticky lg:top-20">
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs uppercase tracking-wide text-gray-700">
                {project.category}
              </span>
            </div>

            <dl className="space-y-3 text-sm text-gray-600">
              {project.client && (
                <div>
                  <dt className="font-medium text-gray-800">Client</dt>
                  <dd>{project.client}</dd>
                </div>
              )}

              <div>
                <dt className="font-medium text-gray-800">Year</dt>
                <dd>2022</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}
