'use client';

import { Button } from '@/shared/ui/button';
import ConfirmPopup from '@/shared/ui/confirm-popup';
import { useState } from 'react';
import { logout } from '../model/logout';

export function LogoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Выйти из аккаунта
      </Button>
      <ConfirmPopup
        open={open}
        onOpenChange={setOpen}
        title="Выход из аккаунта"
        description="Вы уверены, что хотите выйти из аккаунта?"
        onConfirm={() => logout()}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
