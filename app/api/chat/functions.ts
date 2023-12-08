import { FunctionCallHandler } from "ai";
import { ChatCompletionFunctions } from "openai-edge";

export const functionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall,
) => {
  switch (functionCall.name) {
    case "choose_topic":
      console.log("Handling choose topic function");
      break;
    case "drill_exercises":
      console.log("Retrieving exercises to drill");
      break;
    case "create_exercises":
      console.log("Creating exercises");
      break;
    default:
      console.error(`Unknown function call: ${functionCall.name}`);
  }
  console.log("Function call handled.");
};

export const functions: ChatCompletionFunctions[] = [
  {
    name: "create_exercises",
    description:
      "Creates a list of exercises based on the course, topic, difficulty, and number of exercises.",
    parameters: {
      type: "object",
      properties: {
        exercises: {
          type: "array",
          items: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description: "The question of the exercise.",
              },
              answer: {
                type: "string",
                description:
                  "The answer to the exercise. Just a mathemtical expression. No text.",
              },
              answer_prefix: {
                type: "string",
                description:
                  "The left side of the answer equation. \
                  Should end with `=`\
                  The prefix guides users in formulating their response. For an exercise 'x - 2 = 1', the prefix is 'x =', and the answer is '3'.",
              },
              hint: {
                type: "string",
                description:
                  "A short hint to help solve the exercise. Should point to the first step of solving. ",
              },
            },
          },
        },
      },
      required: ["exercises"],
    },
  },
  {
    name: "choose_topic",
    description:
      "Let's the user choose a topic to study or drill. Necessary for other functions that need a topic",
    parameters: {
      type: "object",
      properties: {
        sentence: {
          type: "string",
          description:
            "Sentence that asks the user to choose topic and what for. Based on the query that triggers this function.",
        },
      },
      required: ["sentence"],
    },
  },
  {
    name: "drill_exercises",
    description:
      "Let's the user drill exercises. Not for providing exercise help. The topic and course must have been stated explicitly before. ",
    parameters: {
      type: "object",
      properties: {
        course: {
          type: "string",
          enum: ["algebra", "calculus", "geometry", "trigonometry"],
          description: "The course of exercises to drill.",
        },
        topic: {
          type: "string",
          enum: [
            "derivatives",
            "integrals",
            "angles",
            "equations",
            "functions",
            "polynomials",
            "circles",
            "triangles",
            "limits",
          ],
          description: "The topic, e.g. derivatives, integrals, angles.",
        },
        number: {
          type: "number",
          description: "Number of exercises, defaults to 5",
        },
        difficulty: {
          type: "string",
          enum: ["beginner", "intermediate", "advanced"],
          description: "The difficulty level.",
        },
      },
      required: ["course", "topic", "number", "difficulty"],
    },
  },
  {
    name: "exercise_help",
    description:
      "Function that sets you in a mode to help the student with exercises.",
    parameters: {
      type: "object",
      properties: {
        sentence: {
          type: "string",
          description: "Sentence that starts the exercise help conversation.",
        },
      },
    },
  },
];
