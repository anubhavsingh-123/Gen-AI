
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
}

export interface QueryResult {
  data: any;
  chartType: 'bar' | 'line' | 'pie' | 'area';
  loading: boolean;
  error: string | null;
}

interface QueryState {
  currentQuery: string;
  suggestions: string[];
  history: QueryHistoryItem[];
  result: QueryResult;
}

const initialState: QueryState = {
  currentQuery: '',
  suggestions: [
    'Show me monthly revenue for the last year',
    'What are our top 5 performing products?',
    'Compare sales by region for Q1 and Q2',
    'What is the customer churn rate this quarter?',
    'Analyze marketing campaign performance by channel'
  ],
  history: [],
  result: {
    data: null,
    chartType: 'bar',
    loading: false,
    error: null
  }
};

// Mock data generator functions
const generateRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    value: Math.floor(Math.random() * 50000) + 30000
  }));
};

const generateProductsData = () => {
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  return products.map(product => ({
    name: product,
    value: Math.floor(Math.random() * 5000) + 1000
  }));
};

const generateRegionalData = () => {
  const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
  return regions.map(region => ({
    name: region,
    Q1: Math.floor(Math.random() * 3000) + 1000,
    Q2: Math.floor(Math.random() * 3000) + 1000
  }));
};

const generateChurnData = () => {
  const months = ['Jan', 'Feb', 'Mar'];
  return months.map(month => ({
    name: month,
    rate: Math.random() * 0.05 + 0.01
  }));
};

const generateMarketingData = () => {
  const channels = ['Social Media', 'Email', 'Search', 'Direct', 'Referral'];
  return channels.map(channel => ({
    name: channel,
    impressions: Math.floor(Math.random() * 100000) + 10000,
    conversions: Math.floor(Math.random() * 2000) + 100
  }));
};

// Helper to generate mock data based on query
const getMockDataForQuery = (query: string) => {
  if (query.toLowerCase().includes('revenue')) {
    return { data: generateRevenueData(), chartType: 'bar' as const };
  } 
  if (query.toLowerCase().includes('product')) {
    return { data: generateProductsData(), chartType: 'bar' as const };
  }
  if (query.toLowerCase().includes('region') || query.toLowerCase().includes('sales')) {
    return { data: generateRegionalData(), chartType: 'bar' as const };
  }
  if (query.toLowerCase().includes('churn')) {
    return { data: generateChurnData(), chartType: 'line' as const };
  }
  if (query.toLowerCase().includes('marketing') || query.toLowerCase().includes('campaign')) {
    return { data: generateMarketingData(), chartType: 'area' as const };
  }
  // Default data
  return { data: generateRevenueData(), chartType: 'bar' as const };
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    submitQuery: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      
      // Add to history
      state.history.unshift({
        id: Date.now().toString(),
        query,
        timestamp: new Date()
      });
      
      // Limit history to 10 items
      if (state.history.length > 10) {
        state.history = state.history.slice(0, 10);
      }
      
      // Set loading state
      state.result.loading = true;
      state.result.error = null;
    },
    setQueryResult: (state, action: PayloadAction<QueryResult>) => {
      state.result = action.payload;
    },
    clearQueryResult: (state) => {
      state.result.data = null;
      state.result.error = null;
      state.result.loading = false;
    },
    removeHistoryItem: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(item => item.id !== action.payload);
    },
    processQuerySuccess: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      const mockData = getMockDataForQuery(query);
      
      state.result = {
        data: mockData.data,
        chartType: mockData.chartType,
        loading: false,
        error: null
      };
    },
    processQueryFailure: (state, action: PayloadAction<string>) => {
      state.result = {
        ...state.result,
        loading: false,
        error: action.payload
      };
    }
  }
});

export const { 
  setCurrentQuery, 
  submitQuery, 
  setQueryResult, 
  clearQueryResult, 
  removeHistoryItem,
  processQuerySuccess,
  processQueryFailure
} = querySlice.actions;

export default querySlice.reducer;
