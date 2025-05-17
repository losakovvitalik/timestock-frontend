import { Loader } from '@/shared/ui/loader';

export default function LoadingPage() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Loader absolute />
    </div>
  );
}
