export const Total = ({ course_parts }) => {
  const sum = course_parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0);
  //console.log(sum);

  return (
    <p><strong>Total of {sum} exercises</strong></p>
  );
};