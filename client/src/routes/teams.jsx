import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import employeeService from "../api/employeeService";
import HeroSection from "../components/HeroSection";
import MemberCard from "../components/MemberCard";

export const Route = createFileRoute("/teams")({
  component: Teams,
});

const Teams = () => {
  const [activeDepartment, setActiveDepartment] = useState(null);
  const {
    data: employees,
    isPending: isPendingEmployees,
    isError: isErrorEmployees,
    error: errorEmployees,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => employeeService.getAllEmployees(),
    staleTime: 30000,
  });

  if (isPendingEmployees) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isErrorEmployees) {
    return (
      <div>
        <h2>Error: {errorEmployees.message}</h2>
      </div>
    );
  }

  // Extract unique departments
  const departments = [
    ...new Set(
      employees.map((emp) =>
        typeof emp.department === "object"
          ? emp.department.en || emp.department.de || ""
          : emp.department || "",
      ),
    ),
  ];

  // Filter team members based on selected department
  const filteredEmployees = activeDepartment
    ? employees.filter((emp) => emp.department === activeDepartment)
    : employees;

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Meet Our"
        highlight="Team"
        description="Meet the passionate team at Ele Gardens — horticulturists, designers, and plant-care specialists who combine practical expertise with sustainable practices to bring your outdoor spaces to life."
      />

      {/* Team Members Section */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6">
          {/* Department Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeDepartment === null
                  ? "bg-primary text-on-dark"
                  : "hover:bg-surface/90 bg-surface text-primary"
              }`}
              onClick={() => setActiveDepartment(null)}
            >
              All Departments
            </button>
            {departments.map((department) => (
              <button
                key={department}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeDepartment === department
                    ? "bg-primary text-on-dark"
                    : "hover:bg-surface/90 bg-surface text-primary"
                }`}
                onClick={() => setActiveDepartment(department)}
              >
                {typeof department === "object"
                  ? department.en || department.de
                  : department}
              </button>
            ))}
          </div>

          {/* Display team members */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {filteredEmployees.map((employee) => (
              <MemberCard key={employee._id} member={employee} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary/10 py-12 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-medium">Get in Touch</h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Have questions about our services? Contact our team directly or
            visit our contact page.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="rounded-full bg-primary px-6 py-3 text-on-dark transition hover:bg-primary-dark"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
