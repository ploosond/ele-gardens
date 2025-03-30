import { useState } from "react";
import MemberCard from "../components/MemberCard";
import HeroSection from "../components/HeroSection";

const Teams = ({ members }) => {
  const [activeDepartment, setActiveDepartment] = useState(null);

  // Extract unique departments
  const departments = [...new Set(members.map((emp) => emp.department))];

  // Filter team members based on selected department
  const filteredEmployees = activeDepartment
    ? members.filter((emp) => emp.department === activeDepartment)
    : members;

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Meet Our"
        highlight="Team"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
              ab velit nobis nihil ea cum commodi labore voluptas. Consectetur
              suscipit  tempore."
      />

      {/* Team Members Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        {/* Department Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeDepartment === null
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-green-700 hover:bg-gray-200"
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
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-green-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveDepartment(department)}
            >
              {department}
            </button>
          ))}
        </div>

        {/* Display team members */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredEmployees.map((employee) => (
            <MemberCard key={employee._id} member={employee} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-green-50 py-12 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-medium">Get in Touch</h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Have questions about our services? Contact our team directly or
            visit our contact page.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="rounded-full bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teams;
