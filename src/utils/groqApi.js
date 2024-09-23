import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true
});

// Function to send the image to the Groq API for evaluation
export const sendImageToAPI = async (imageUrl) => {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: 'Explain the the question and its type(MCQ/SAQ/ANY OTHER TYPE) in the image below along with the questions options or any diagram provided:',
                        },
                        {
                            type: 'image_url',
                            image_url: { url: imageUrl },
                        },
                    ],
                },
            ],
            model: 'llava-v1.5-7b-4096-preview',
            temperature: 0,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error in image evaluation:', error);
        throw error;
    }
};

// Function to send chat messages and receive AI response
export const sendMessageToAPI = async (message) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a AI bot that is trained to answer aptitude questions. When an question description is provided, you can answer the question. If the question has multiple choice options, you can answer the question by selecting the correct option. If the question is a short answer question, you can answer the question by providing the answer in text format. If the question is a diagram based question, you can answer the question by providing the answer in text format. Justify the answer with a brief explanation only if asked. If you are unable to answer the question, please let the user know.',
                },
                {
                    role: 'user',
                    content: message,
                },
            ],
            model: 'llama3-8b-8192',
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: true,
            stop: null,
        });

        let aiResponse = '';
        for await (const chunk of chatCompletion) {
            aiResponse += chunk.choices[0]?.delta?.content || '';
        }
        return aiResponse;
    } catch (error) {
        console.error('Error in AI chat response:', error);
        throw error;
    }
};
