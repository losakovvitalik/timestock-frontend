import { Button } from '@/shared/ui/button';
import { Play } from 'lucide-react';

function StartTimerButton() {
  return (
    <Button className="size-24 rounded-full">
      <Play className="size-12 fill-white stroke-white" />
    </Button>
  );
}

export { StartTimerButton };
