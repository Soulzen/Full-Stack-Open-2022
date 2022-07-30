const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part}></Part>)

const Total = function ({ parts }) {
  const sum = parts.reduce((p, c) => {
    return { exercises: p.exercises + c.exercises }
  })
  return <p>Number of exercises {sum.exercises}</p>
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  )
}

export default Course
