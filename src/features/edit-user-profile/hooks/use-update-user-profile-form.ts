import { UserDTO } from '@/entities/user/model/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  updateUserProfileFormSchema,
  UpdateUserProfileFormSchemaType,
} from '../model/update-user-profile-form-schema';

export interface UseUpdateUserProfileFormProps {
  defaultValues?: Partial<Pick<UserDTO, 'timezone'>>;
}

export function useUpdateUserProfileForm({ defaultValues }: UseUpdateUserProfileFormProps) {
  return useForm<UpdateUserProfileFormSchemaType>({
    resolver: zodResolver(updateUserProfileFormSchema),
    defaultValues: {
      timezone: defaultValues?.timezone,
    },
  });
}
