import { Total } from "./Total";
import { Content } from "./Content";
import { Header } from "./Header";

export const Course = ({ course }) => {

  return (
    <div>
      <Header course_name={course.name} />
      <Content course_parts={course.parts} />
      <Total course_parts={course.parts} />
    </div>
  );
};
