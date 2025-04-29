import { Button } from '@/shared/ui/button';
import { Clock, FolderOpen, Menu } from 'lucide-react';

function Tabbar() {
  return (
    <nav>
      <ul className='flex justify-between px-10 py-2 border border-t'>
        <li>
          <Button className='size-10' variant={'outline'}>
            <FolderOpen />
          </Button>
        </li>
        <li>
          <Button className='size-10' variant={'outline'}>
            <Clock />
          </Button>
        </li>
        <li>
          <Button className='size-10' variant={'outline'}>
            <Menu />
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export { Tabbar };
