'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { Typography } from '@/shared/ui/typography';
import { useAuthOTPForm } from '../hooks/use-auth-otp-form';
import { useConfirmOTP } from '../hooks/use-confirm-otp';
import { AuthOTPFormSchemaType } from '../model/auth-otp-form-schema';

export interface AuthOTPFormProps {
  email: string;
}

export function AuthOTPForm({ email }: AuthOTPFormProps) {
  const confirmOTP = useConfirmOTP();

  const form = useAuthOTPForm({
    defaultValues: {
      email,
    },
  });

  const onSubmit = (data: AuthOTPFormSchemaType) => {
    confirmOTP.mutate(data);
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>
          <Typography className="text-center" variant={'subtitle'}>
            Код
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      disabled={confirmOTP.isPending}
                      onComplete={() => form.handleSubmit(onSubmit)()}
                      maxLength={6}
                      {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-center">
                    Пожалуйста, введите код отправленный на {email}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={confirmOTP.isPending} type="submit">
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
