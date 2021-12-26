export const Part = ({ course_part }) => {
  return (
    <p>
      {course_part.name} {course_part.exercises}
    </p>
  );
};
