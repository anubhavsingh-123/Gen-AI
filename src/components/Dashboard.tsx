
import Header from './Header';
import QueryInput from './QueryInput';
import QueryHistory from './QueryHistory';
import ResultsDisplay from './ResultsDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, History, BarChart2, Database } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Ask Anything About Your Data</h1>
            <p className="text-muted-foreground mb-6">
              Get instant insights using natural language - no SQL knowledge required.
            </p>
            
            <QueryInput />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search size={18} className="text-analytics-primary" />
                  Natural Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Ask complex business questions in plain English.</CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database size={18} className="text-analytics-accent" />
                  Instant Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Connect directly to your data sources without technical skills.</CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart2 size={18} className="text-analytics-highlight" />
                  Visual Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Automatically visualize data in the most appropriate format.</CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResultsDisplay />
            </div>
            <div>
              <QueryHistory />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-analytics-border py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          GenAI Analytics &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
