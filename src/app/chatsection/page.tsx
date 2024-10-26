"use client"; // Use this directive if you're using Next.js with the App Router

import React, { useState } from "react";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; type: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const predefinedQuestions = [
    { question: "What are your shipping options?", answer: "We offer standard and express shipping options." },
    { question: "How do I return an item?", answer: "You can return an item within 30 days of purchase. Please visit our Returns Policy page for more details." },
    { question: "Do you offer discounts for bulk orders?", answer: "Yes, we provide discounts for bulk purchases. Please contact us for more information." },
    { question: "How can I track my order?", answer: "Once your order has shipped, you will receive a tracking link via email." },
    { question: "What payment methods do you accept?", answer: "We accept various payment methods including credit cards and PayPal." },
    { question: "How do I create an account?", answer: "You can create an account by clicking the 'Sign Up' button on our website." },
    { question: "Can I change or cancel my order?", answer: "If you need to change or cancel your order, please contact us as soon as possible." },
    { question: "What should I do if my order is damaged?", answer: "If your order is damaged, please contact our support team within 48 hours." },
    { question: "Do you ship internationally?", answer: "Yes, we do offer international shipping." },
    { question: "What should I do if I forget my password?", answer: "If you forget your password, click the 'Forgot Password?' link on the login page." },
  ];

  const handlePredefinedQuestion = (question: string) => {
    const predefinedAnswer = predefinedQuestions.find(q => q.question === question);
    if (predefinedAnswer) {
      setMessages((prev) => [...prev, { text: predefinedAnswer.answer, type: "bot" }]);
    } else {
      setMessages((prev) => [...prev, { text: "I'm sorry, I can't help with that. Would you like to contact an agent?", type: "bot" }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, type: "user" }]);
      handlePredefinedQuestion(input);
      setInput("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Live Chat Support</h1>

      {/* Chat Window */}
      <div className="border border-gray-300 rounded-lg p-4 mb-4 h-96 overflow-y-auto flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`my-2 ${message.type === "user" ? "text-right" : "text-left"}`}>
              <div className={`inline-block p-2 rounded-lg ${message.type === "user" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-800"}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predefined Questions */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Common Questions</h2>
        <ul className="list-disc list-inside">
          {predefinedQuestions.map((item, index) => (
            <li key={index} className="cursor-pointer text-teal-600 hover:underline" onClick={() => handlePredefinedQuestion(item.question)}>
              {item.question}
            </li>
          ))}
        </ul>
      </div>

      {/* User Input */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border border-gray-300 p-2 rounded-l-lg mb-2 sm:mb-0 sm:mr-2"
          placeholder="Type your message here..."
        />
        <button type="submit" className="bg-teal-600 text-white px-4 rounded-lg hover:bg-teal-500 transition duration-300">
          Send
        </button>
      </form>

      {/* Contact Agent Section */}
      <div className="mt-4 text-center">
        <p>If you need more assistance, please <a href="/contact" className="text-teal-600 hover:underline">contact an agent</a>.</p>
      </div>
    </div>
  );
};

export default ChatPage;
