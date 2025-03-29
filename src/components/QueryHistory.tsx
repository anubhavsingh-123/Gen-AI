
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCurrentQuery, removeHistoryItem } from '@/store/querySlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

const QueryHistory = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector(state => state.query);
  
  const handleSelectQuery = (query: string) => {
    dispatch(setCurrentQuery(query));
  };
  
  const handleRemoveQuery = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeHistoryItem(id));
  };

  if (history.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock size={18} />
            Query History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            No queries yet. Start by asking a question above.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock size={18} />
          Query History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectQuery(item.query)}
                className="flex items-center justify-between p-3 rounded-md bg-card hover:bg-analytics-muted cursor-pointer group transition-colors"
              >
                <div className="flex-1 truncate">
                  <p className="font-medium truncate">{item.query}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleRemoveQuery(item.id, e)}
                >
                  <X size={16} />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QueryHistory;
