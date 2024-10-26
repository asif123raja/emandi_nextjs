//AIzaSyBB-_5Mj-WgczlfyhWYkceGvuSYiRbWFVk
"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaUpload } from "react-icons/fa";
import { marked } from "marked";

const genAI = new GoogleGenerativeAI("AIzaSyBB-_5Mj-WgczlfyhWYkceGvuSYiRbWFVk");

const AskPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAsk = async () => {
    if (!input && !image) return;

    try {
      let prompt = "";

      if (image) {
        // Custom prompt for image-based input
        prompt = "Identify the ingredients and provide a Biryani recipe based on this food image, structured with clear ingredients, quantities, and instructions.";
      } else {
        // Structured prompt for text input
        prompt = `Provide a Biryani recipe with clear, standard formatting. Respond only with recipe details without additional text. Use this format:
        1. Ingredients:
        - List each ingredient in bullet points with clear names.
        2. Quantities:
        - Provide specific amounts for each ingredient.
        3. Instructions:
        - Number each step for the preparation and cooking instructions in a brief and concise format.
  
        Question: ${input}`;
      }

      // Configure the model for concise responses with a specific format
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);

      // Set response with clear formatting
      setResponse(result.response.text().slice(0, 10000)); // Limit response to 500 characters for brevity
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("There was an error generating the response.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">Ask About Food Items</h1>

      {/* Image Upload Section */}
      <div className="flex items-center space-x-2">
        <input type="file" accept="image/*" onChange={handleImageUpload} hidden id="file-upload" />
        <label htmlFor="file-upload" className="flex items-center cursor-pointer bg-teal-600 text-white px-3 py-2 rounded">
          <FaUpload className="mr-2" /> Upload Food Image
        </label>
      </div>

      {/* Text Input Section */}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Ask a question about a fruit, vegetable, or recipe..."
        className="w-full max-w-lg p-2 border rounded"
      />

      <button onClick={handleAsk} className="bg-green-500 text-white px-4 py-2 rounded">
        Ask
      </button>

      {/* Output Section */}
      <div className="w-full max-w-lg bg-gray-100 p-4 rounded shadow mt-4">
        <h2 className="text-lg font-semibold">Response</h2>
        <div
          dangerouslySetInnerHTML={{ __html: marked(response || "Your answer will appear here.") }}  // Use marked to parse Markdown to HTML
        />
      </div>
    </div>
  );
};

export default AskPage;
// src/app/ask/page.tsx

// "use client";
// import React, { useState } from "react";
// import { FaUpload } from "react-icons/fa";
// import axios from "axios";

// const AskPage: React.FC = () => {
//   const [input, setInput] = useState<string>("");
//   const [response, setResponse] = useState<string>("");
//   const [image, setImage] = useState<File | null>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleAsk = async () => {
//     const formData = new FormData();
//     formData.append("question", input);
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post("/api/ask", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResponse(response.data.response); // Assume response has `response` field
//     } catch (error: any) {
//       console.error("Error generating response:", error);
//       setResponse("There was an error generating the response.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4 space-y-4">
//       <h1 className="text-2xl font-bold">Ask About Food Items</h1>

//       <div className="flex items-center space-x-2">
//         <input type="file" accept="image/*" onChange={handleImageUpload} hidden id="file-upload" />
//         <label htmlFor="file-upload" className="flex items-center cursor-pointer bg-teal-600 text-white px-3 py-2 rounded">
//           <FaUpload className="mr-2" /> Upload Food Image
//         </label>
//       </div>

//       <input
//         type="text"
//         value={input}
//         onChange={handleInputChange}
//         placeholder="Ask a question about a fruit, vegetable, or recipe..."
//         className="w-full max-w-lg p-2 border rounded"
//       />

//       <button onClick={handleAsk} className="bg-green-500 text-white px-4 py-2 rounded">
//         Ask
//       </button>

//       <div className="w-full max-w-lg bg-gray-100 p-4 rounded shadow mt-4">
//         <h2 className="text-lg font-semibold">Response</h2>
//         <div dangerouslySetInnerHTML={{ __html: response }} />
//       </div>
//     </div>
//   );
// };

// export default AskPage;
