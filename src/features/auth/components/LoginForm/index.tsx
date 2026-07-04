import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthSchema } from "../../schemas/auth.schema";
import { useLogin } from "../../hooks/useLogin";
import styles from "./LoginForm.module.css";
import { Input } from "../../../../components/form/Input";
import { MoveRight } from "lucide-react";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const { mutate, isPending, error } = useLogin();

  const onSubmit = (data: AuthSchema) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.inputContainer}>
        <Input
          label="E-mail"
          placeholder="seu@email.com"
          type="email"
          requerid
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Senha"
          placeholder="••••••••"
          type="password"
          requerid
          error={errors.password?.message}
          {...register("password")}
        />

        {error && (
          <p className={styles.err}>Credenciais inválidas. Tente novamente.</p>
        )}
      </div>

      <button className={styles.buttonForm} type="submit" disabled={isPending}>
        {isPending ? (
          "Entrando..."
        ) : (
          <>
            Entrar <MoveRight />
          </>
        )}
      </button>
    </form>
  );
};
