// import dotenv from "dotenv";

// const result = dotenv.config({ path: ".env" });

// console.log("DOTENV RESULT:", result);





import dotenv from "dotenv";

const result = dotenv.config({ path: ".env" });

console.log(result);
console.log(process.env.GEMINI_API_KEY);





// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyA3z6Qt7nJV0e_cpLe9G4CzTAr3fANRQcc";

// const genAI = new GoogleGenerativeAI(API_KEY);

// async function test() {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//     });

//     const result = await model.generateContent("hello");

//     console.log(result.response.text());

//   } catch (err) {
//     console.error(err);
//   }
// }

// test();