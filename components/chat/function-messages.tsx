"use client";
import { FunctionCallPayload, Message } from "ai";
import { DrillExercises } from "./drill-exercises";
import { Suspense, useContext } from "react";
import { ExerciseData, TopicData } from "@/lib/types/types";
import { TopicSelector } from "./topic-selector";
import { TopicsContext } from "@/lib/providers/topics-provider";

export default function useFunctionCall(
  function_call: FunctionCallPayload,
  append: (message: Message) => void,
  id: string,
) {
  const topics: TopicData[] = useContext(TopicsContext);

  switch (function_call.name) {
    case "choose_topic":
      // Handle function1
      return (
        <>
          {function_call.arguments["sentence"]}
          <TopicSelector topics={topics} id={id} append={append} />
        </>
      );
    case "drill_exercises":
      return (
        <Suspense fallback={<p>Loading exercises...</p>}>
          <DrillExercises function_call={function_call} />
        </Suspense>
      );
    case "exercise_help":
      return (
        <p>
          {String(
            function_call.arguments["sentence"] ??
              "What exercise do you want help with?",
          )}
        </p>
      );
    case "create_exercises":
      const exercises: ExerciseData[] = function_call.arguments[
        "exercises"
      ] as ExerciseData[];
      return (
        <div className="flex flex-col p-4">
          {exercises.map((exercise, index) => (
            <p key={index}>{exercise.question}</p>
          ))}
        </div>
      );
    default:
      return <p>Unknown function</p>;
  }
}
