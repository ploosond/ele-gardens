import React from "react";
import { useParams, useNavigate } from "react-router";
import projectsData from "../data/projects";

export default function ProjectDetail({
  project: propProject,
  onBack,
  preview = false,
  onView,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // prefer the explicitly passed project (useful for list preview renderers),
  // otherwise resolve from route param so this component can be used on /projects/:id
  const project =
    propProject || projectsData.find((p) => String(p.id) === String(id));
  // Preview/card mode for listing grid
  if (preview) {
    if (!project) return null;
    const short = project.tagline || project.description || "";
    return (
      <div className="group flex flex-col overflow-hidden rounded bg-transparent">
        <div className="bg-surface overflow-hidden rounded">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mt-6 px-1 sm:px-2 md:px-0">
          {project.client && (
            <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
              {project.client}
            </p>
          )}

          <h3 className="text-text mb-2 text-2xl font-[600] leading-tight">
            {project.title}
          </h3>

          {project.category && (
            <div className="mb-3">
              <span className="bg-muted text-text inline-block rounded-full px-3 py-1 text-xs uppercase tracking-wide">
                {project.category}
              </span>
            </div>
          )}

          {short && <p className="mb-6 text-base text-gray-700">{short}</p>}

          <div>
            <button
              onClick={() =>
                onView ? onView(project) : navigate(`/projects/${project.id}`)
              }
              className="text-on-dark hover:bg-primary-dark rounded-md bg-primary px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200"
            >
              View Project
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If rendered as a routed detail view but project can't be found, show a small fallback
  if (!project) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-gray-700">Project not found.</p>
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }
  return (
    <article
      aria-labelledby="project-title"
      tabIndex={-1}
      className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8"
    >
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
            <div className="rounded-lg bg-primary/10 p-4">
              <p className="text-text text-base font-medium">
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
