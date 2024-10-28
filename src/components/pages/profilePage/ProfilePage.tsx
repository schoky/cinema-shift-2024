import { UpdateProfileDto } from '@src/@types/api';
import { useAuth } from '@src/context/authContext';
import { Button, Input, Typography } from '@src/shared';
import { emailIsValid, firstNameIsValid, lastNameIsValid, phoneIsValid } from '@src/utils';
import { usePatchUserProfileQuery } from '@src/utils/api/hooks/usePatchUserProfileQuery';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const ProfilePage = () => {
  const { mutate, isPending } = usePatchUserProfileQuery();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<UpdateProfileDto>({
    defaultValues: {
      profile: { ...user },
      phone: user?.phone,
    },
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<UpdateProfileDto> = (data) => {
    mutate({ params: data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Typography tag="h2" variant="h2">
          Профиль
        </Typography>
        <Input
          isError={!!errors.profile?.lastname}
          message={errors?.profile?.lastname?.message}
          label="Фамилия"
          {...register('profile.lastname', { validate: lastNameIsValid })}
        />
        <Input
          isError={!!errors.profile?.firstname}
          message={errors.profile?.firstname?.message}
          label="Имя"
          {...register('profile.firstname', { validate: firstNameIsValid })}
        />
        <Input
          isError={!!errors.profile?.middlename}
          message={errors.profile?.middlename?.message}
          label="Отчество"
          {...register('profile.middlename', { maxLength: 60 })}
        />
        <Input
          isError={!!errors.phone}
          message={errors.phone?.message}
          label="Номер телефона"
          disabled
          {...register('phone', { validate: phoneIsValid })}
        />
        <Input
          isError={!!errors.profile?.email}
          message={errors.profile?.email?.message}
          label="Email"
          {...register('profile.email', { validate: emailIsValid })}
        />
        <Input
          isError={!!errors.profile?.city}
          message={errors.profile?.city?.message}
          label="Город"
          {...register('profile.city')}
        />
        <Button loading={isPending} type="submit" disabled={!dirtyFields.profile}>
          Обновить данные
        </Button>
      </form>
    </>
  );
};
