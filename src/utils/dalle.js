import { Configuration, OpenAIApi } from 'openai';

export const dalle = async (prompt) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_CHATGPT_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: `${prompt}`,
    n: 1,
    size: '512x512',
  });

  return response;
};
