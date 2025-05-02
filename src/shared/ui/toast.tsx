import { CheckCircle, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from './button';
import { Card, CardContent } from './card';

type CustomToastProps = {
  t: any;
  title: string;
  description?: string;
  status?: 'success' | 'error' | 'info';
};

export const showCustomToast = ({
  title,
  description,
  status = 'info',
}: Omit<CustomToastProps, 't'>) => {
  toast.custom((t) => (
    <CustomToast t={t} title={title} description={description} status={status} />
  ));
};

const statusIcons = {
  success: <CheckCircle className="text-green-500" size={20} />,
  error: <X className="text-red-500" size={20} />,
  info: <CheckCircle className="text-blue-500" size={20} />,
};

const CustomToast = ({ t, title, description, status = 'info' }: CustomToastProps) => {
  return (
    <Card
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } bg-background flex max-w-sm items-start border shadow-md`}
    >
      <CardContent className="flex items-start gap-3 p-4">
        <div>{statusIcons[status]}</div>
        <div className="flex-1">
          <p className="font-semibold">{title}</p>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => toast.dismiss(t.id)}
        >
          <X size={16} />
        </Button>
      </CardContent>
    </Card>
  );
};
