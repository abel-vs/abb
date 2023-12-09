import { Message, FunctionCallPayload } from "ai";

function extractObjectString(
  identifier: string,
  inputStr: string
): string | null {
  // Split the string at "arguments" and take the second part
  let splitStr = inputStr.split("arguments");
  if (splitStr.length <= 1) return null;

  // Split the resulting string at "identifier" and take the second part
  let splitStr2 = splitStr[1].split(identifier);
  return splitStr2.length > 1 ? splitStr2[1] : null;
}

export function extractObjects(identifier: string, inputStr: string): any[] {
  let start = 0;
  let braceCount = 0;
  let extractedObjects: any[] = [];

  // Extract the string containing the objects
  const objectsStr = extractObjectString(identifier, inputStr);
  if (!objectsStr) {
    return extractedObjects;
  }

  for (let i = 0; i < objectsStr.length; i++) {
    let char = objectsStr[i];
    if (char === "{") {
      braceCount++;
    } else if (char === "}") {
      braceCount--;
    }
    if (braceCount === 0 && start !== 0) {
      let str = objectsStr.substring(start, i + 1);
      try {
        let cleansedString = str
          .replace(/\\n/g, "")
          .replace(/\\ /g, " ")
          .replace(/\\\\/g, "\\")
          .replace(/\\"/g, '"');
        let object = JSON.parse(cleansedString);
        extractedObjects.push(object);
      } catch (e) {
        // Handle invalid JSON if needed
        let cleansedString = str
          .replace(/\\n/g, " ")
          .replace(/\\ /g, " ")
          .replace(/\\\\/g, "\\")
          .replace(/\\"/g, '"');
        console.log("Invalid JSON");
        console.log("Cleaned string", cleansedString);
        console.log(e);
      }
      start = 0; // Reset
    }
    if (braceCount === 1 && start === 0) {
      start = i;
    }
  }
  return extractedObjects;
}

export function extractFunctionCall(
  message: Message
): FunctionCallPayload | undefined {
  let functionCall = message.function_call;

  // Return if there is no function call
  if (!functionCall) {
    return;
  }

  if (typeof functionCall === "object") {
    // If the functionCall is an object, the function call is already complete
    if (!functionCall.name || !functionCall.arguments) {
      return undefined;
    }
    return {
      name: functionCall.name,
      arguments: JSON.parse(functionCall.arguments),
    };
  } else if (typeof functionCall === "string") {
    // If the functionCall is a string, it is still being generated
    try {
      const exercises = extractObjects("exercises", functionCall);
      if (exercises) {
        return {
          name: "create_exercises",
          arguments: { exercises: exercises },
        };
      }
    } catch (error) {
      // Do nothing
    }
  } else {
    throw new Error("Unkown function call type");
  }
}
