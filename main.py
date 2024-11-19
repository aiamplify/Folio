import os
from dotenv import load_dotenv
import openai

# Load environment variables from .env file
load_dotenv()

# Configure OpenAI with API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_completion(prompt, max_tokens=100):
    try:
        response = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=0.7
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def main():
    # Example usage
    prompt = "Write a short poem about coding:"
    result = generate_completion(prompt)
    
    if result:
        print("\nPrompt:", prompt)
        print("\nResponse:", result)
    else:
        print("Failed to generate completion. Please check your API key and try again.")

if __name__ == "__main__":
    main()
