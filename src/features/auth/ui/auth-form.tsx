'use client';
import { ApiError } from '@/shared/types/api';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { AxiosError } from 'axios';
import { useAuthForm } from '../hooks/use-auth-form';
import { useSendOtp } from '../hooks/use-send-otp';
import { AuthFormSchemaType } from '../model/auth-form-schema';

function AuthForm() {
  const form = useAuthForm();
  const { sendOTP, isSendOTPPending } = useSendOtp({
    onError(err) {
      if (err instanceof AxiosError) {
        const response = err.response?.data as ApiError;
        const code = response?.error?.code;

        if (code === 'FAILED_SEND_EMAIL') {
          form.setError('email', {
            message: 'Не удалось отправить email. Попробуйте позже',
          });
        }
      }
    },
  });

  const onSubmit = (values: AuthFormSchemaType) => {
    sendOTP(values);
  };

  return (
    <Card className="max-w-sm">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Введите email, чтобы войти. Если у вас ещё нет аккаунта, то он будет{' '}
                    <span className="text-foreground underline">создан</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isSendOTPPending} type="submit">
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { AuthForm };
