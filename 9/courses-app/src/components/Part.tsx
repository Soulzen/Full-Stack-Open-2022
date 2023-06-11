import { CoursePart } from "../types"

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>
          <p>submit to {coursePart.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>
          <p>required skills: {coursePart.requirements.toString()}</p>
        </div>
      )

    default:
      return assertNever(coursePart)
  }
}

export default Part
