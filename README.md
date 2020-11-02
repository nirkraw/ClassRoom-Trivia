# Classroom Trivia

## Setup Instructions

To start application please ```npm install``` and then ```npm run start``` to start server.

## Dependencies 
- "@testing-library/jest-dom": "^5.11.5",
- "@testing-library/react": "^11.1.0",
- "@testing-library/user-event": "^12.1.10",
- "eslint-plugin-react-hooks": "^4.2.0",
- "react": "^17.0.1",
- "react-dom": "^17.0.1",
- "react-scripts": "4.0.0",
- "web-vitals": "^0.2.4"

## Limitations

- Currently the application is run on a single json file with pre-formatted questions. To have application run on any set of questions an "add file" option would need to be available with instructions on formatting. 
- The app is run to have up to four options and more than that would create issues with formating.  

## Possible enhancements
- Create a databass and allow users to both store their top scores and taken quizes, as well as upload their own trivia.
- Create a social media homepage where users can see the top trivia being used by friends and globally
- Track data and categorize different trivia's by difficulty
- Allow users to switch off clock or change the time allowed


# Coding Challenge Criteria

1.  Your goal is to create an application that displays trivia questions with multiple-choice answers to select
from.
2. Use creative license in terms of how you want us to see this game. At minimum, the player can view the
question(s), the answer choices, the correct answer upon submission, and their score. It could be a user
interface (UI), command-line-tool, etc
3. *Assumptions* 
• A round of trivia has 10 Questions
• All questions are multiple-choice questions
• Your score does not need to update in real time
• Results can update on form submit, button click, or any interaction you choose
• We will provide you with the trivia data such as the questions, correct and incorrect answers via a
JSON file.
4. *Acceptance Criteria*
• A user can view questions.
• Questions with their multiple choice options must be displayed one at a time.
• Questions should not repeat in a round.
• A user can select only 1 answer out of the 4 possible answers.
• The correct answer must be revealed after a user has submitted their answer
• A user can see the score they received at the end of the round