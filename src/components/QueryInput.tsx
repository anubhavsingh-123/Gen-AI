
import { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentQuery, submitQuery, processQuerySuccess, processQueryFailure } from '@/store/querySlice';
import { useToast } from '@/hooks/use-toast';

const QueryInput = () => {
  const dispatch = useAppDispatch();
  const { currentQuery, suggestions } = useAppSelector(state => state.query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentQuery(e.target.value));
    if (e.target.value.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  };

  const handleSubmitQuery = () => {
    if (currentQuery.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a query.",
        variant: "destructive"
      });
      return;
    }

    dispatch(submitQuery(currentQuery));
    setShowSuggestions(false);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // 10% chance of simulated error
        if (Math.random() < 0.1) {
          throw new Error("Unable to process query. Please try again.");
        }
        dispatch(processQuerySuccess(currentQuery));
        toast({
          title: "Query processed",
          description: "Results have been generated successfully."
        });
      } catch (error) {
        dispatch(processQueryFailure((error as Error).message));
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter
    if (e.key === 'Enter') {
      handleSubmitQuery();
      return;
    }

    // Navigate suggestions with arrow keys
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      } else if (e.key === 'Tab' && activeSuggestion >= 0) {
        e.preventDefault();
        dispatch(setCurrentQuery(filteredSuggestions[activeSuggestion]));
      }
    }
  };

  // Filter suggestions based on current query
  const filteredSuggestions = currentQuery.trim() !== '' 
    ? suggestions.filter(s => 
        s.toLowerCase().includes(currentQuery.toLowerCase())
      )
    : suggestions;

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setCurrentQuery(suggestion));
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <div className="flex items-center space-x-2 relative">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask a question about your data..."
            className="pl-10 py-6 text-base border-2 focus-visible:ring-analytics-primary"
            value={currentQuery}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            onFocus={() => currentQuery.length > 0 && setShowSuggestions(true)}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg animate-fade-in">
              <ul className="py-1 text-sm">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 cursor-pointer hover:bg-analytics-muted ${
                      index === activeSuggestion ? 'bg-analytics-muted' : ''
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Button 
          onClick={handleSubmitQuery}
          className="bg-analytics-primary hover:bg-analytics-secondary px-6 py-6"
        >
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default QueryInput;
