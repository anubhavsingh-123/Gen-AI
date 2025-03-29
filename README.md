# GenAI Analytics Dashboard

## Project Overview

GenAI Analytics is a React-based dashboard prototype that demonstrates a natural language interface for querying business data. This tool democratizes data insights across business units by allowing non-technical teams to ask complex questions in plain English and receive instant, visual results.

## Live Demo

[View Live Demo](https://lovable.dev/projects/f98712c3-337a-4f03-a129-c9c069a91619)

## Features

- **Natural Language Queries**: Ask business questions in plain English
- **AI-Powered Suggestions**: Get query suggestions as you type
- **Query History**: Track and reuse previous queries
- **Visual Results**: Automatically visualized data in the most appropriate chart format
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technical Stack

- **Frontend Framework**: React.js with TypeScript
- **State Management**: Redux Toolkit for efficient global state
- **Styling**: Tailwind CSS with shadcn-ui components
- **Data Visualization**: Recharts library
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/         # UI components
│   ├── Dashboard.tsx   # Main dashboard layout
│   ├── Header.tsx      # Application header
│   ├── QueryInput.tsx  # Natural language query input with suggestions
│   ├── QueryHistory.tsx # History of previous queries
│   ├── ResultsDisplay.tsx # Data visualization component
│   └── ui/             # shadcn UI components
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup and configuration
│   ├── querySlice.ts   # Query state management
│   └── hooks.ts        # Custom Redux hooks
├── pages/              # Application pages
│   └── Index.tsx       # Main page wrapper
└── App.tsx             # Application entry point
```

## State Management Architecture

The application uses Redux Toolkit to manage global state with the following key slices:

- **Query State**: Manages current query, history, and suggestions
- **Results State**: Handles loading, error, and visualization states

The state flow follows this pattern:
1. User inputs a query in natural language
2. Query is dispatched to Redux store
3. Simulated processing occurs (in a real implementation, this would call an API)
4. Results are stored in Redux and displayed to the user

## UI/UX Design

The dashboard features a clean, modern interface with:

- Simple input field prominently placed for accessibility
- Intuitive suggestion system that appears as you type
- Visual results that automatically select the most appropriate chart type
- Chronological history that allows for quick query reuse
- Responsive layout that works on both desktop and mobile devices

## Code Quality Highlights

- **Typed Components**: Full TypeScript implementation
- **Reusable Components**: Modular design for maintainability
- **Custom Hooks**: Abstracted Redux functionality
- **Error Handling**: Graceful error states and recovery
- **Responsive Design**: Mobile-first approach with Tailwind

## Simulating AI Query Interaction

The prototype simulates the AI query processing:

- Suggestions appear as you type, mimicking real-time AI suggestions
- Query processing includes randomized timing to simulate backend processing
- Error states are randomly triggered to demonstrate robust error handling
- Chart type is intelligently selected based on query content and data structure
- Results are formatted in a way that would be expected from a real AI system

## Development Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd genai-analytics

# Install dependencies
npm install

# Start development server
npm run dev
```

## Future Enhancements

- Backend integration with actual AI processing
- User authentication and personalized query history
- Export functionality for charts and results
- Advanced filtering and query refinement options
- Integration with multiple data sources

## License

MIT

---

*This project was created as part of a frontend engineering challenge to demonstrate skills in React component structure, state management, UI/UX design, code quality, and creative simulation of AI interactions.*
