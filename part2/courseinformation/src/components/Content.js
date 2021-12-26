import { Part } from "./Part";

export const Content = ({ course_parts }) => {
  return (
    <div>
      {course_parts.map(part => <Part key={part.id} course_part={part} />
      )}
    </div>
  );
};
