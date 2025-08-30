const MemberCard = ({ member }) => {
  return (
    <div className="rounded-lg bg-white p-4 text-center shadow-md transition hover:shadow-lg">
      <img
        src={member.profilePicture?.url || "https://via.placeholder.com/150"}
        alt={member.profilePicture?.altText || member.firstname}
        className="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
      />
      <h3 className="mb-2 text-xl font-semibold text-primary">
        {member.firstname} {member.lastname}
      </h3>
      <p className="mb-2 text-sm font-semibold text-secondary">
        {typeof member.role === "object"
          ? member.role.en || member.role.de || ""
          : member.role || ""}
      </p>
      <div className="mt-2 space-y-1">
        <p className="break-words text-sm text-gray-500">{member.email}</p>
        <p className="text-xs text-gray-500 md:text-sm">{member.telephone}</p>
      </div>
    </div>
  );
};

export default MemberCard;
